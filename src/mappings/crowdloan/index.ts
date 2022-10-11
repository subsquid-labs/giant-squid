import * as events from './events'
import * as extrinsics from './calls'
import { assertNotNull, BatchBlock, BatchContext, CommonHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { Equal, In, Not } from 'typeorm'
import { processItem, createEntityMap, last } from '../../common/tools'
import {
    Transfer,
    AccountTransfer,
    TransferDirection,
    Account,
    Contribution,
    Crowdloan,
    Contributor,
    Parachain,
    CrowdloanStatus,
} from '../../model'
import { processTransfer } from '../balances/events/transfer'
import { createPrevStorageContext, getMeta } from '../util/actions'
import { TransferData } from '../util/entities'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { MappingProcessor } from '../../common/mappingProcessor'
import { BlockMap } from '../../common/blockMap'
import { ContributedData, processContributed } from './events/contributed'
import { processCreated, processDissolved } from './events'
import storage from '../../storage'

export default {
    events,
    extrinsics,
}

export class CrowdloansProcessor extends MappingProcessor<Item> {
    async run(blocks: BatchBlock<Item>[]): Promise<void> {
        const { contributionData, createdData, dissolvedData } = this.processItems(blocks)

        const [contributions, creations, dissolves] = await Promise.all([
            this.processContributions(
                contributionData.optimize((block, items) => {
                    const paraIds = items.map((item) => item.paraId)
                    return createdData.some(block, (item) => paraIds.includes(item))
                })
            ),
            this.processCreations(createdData),
            this.processDissolves(dissolvedData),
        ])

        const lastBlock = last(blocks).header

        let crowdloanIds = new Set<string>()
        let contributorsIds = new Set<string>()
        for (const { crowdloanId, contributorId } of contributions) {
            if (!crowdloanId || !contributorId) continue

            crowdloanIds.add(crowdloanId)
            contributorsIds.add(contributorId)
        }

        for (const crowdloanId of dissolves) {
            if (!crowdloanId) continue
            crowdloanIds.add(crowdloanId)
        }

        let crowdloans = await this.ctx.store
            .findBy(Crowdloan, [
                { id: In([...crowdloanIds]) },
                { status: In([CrowdloanStatus.Started, CrowdloanStatus.Ended]) },
            ])
            .then(createEntityMap)
        creations.forEach((crowdloan) => crowdloans.set(crowdloan.id, crowdloan))
        for (const id of crowdloanIds) {
            if (crowdloans.has(id)) continue
            crowdloans.set(id, createCrowdloan(id))
        }

        let contributors = await this.ctx.store
            .findBy(Contributor, { id: In([...contributorsIds]) })
            .then(createEntityMap)
        for (const id of contributorsIds) {
            if (contributors.has(id)) continue
            contributors.set(id, createContributor(id))
        }

        for (const contribution of contributions) {
            if (!contribution.crowdloanId || !contribution.contributorId) continue

            const crowdloan = assertNotNull(crowdloans.get(contribution.crowdloanId))
            crowdloan.raised += contribution.amount

            const contributor = assertNotNull(contributors.get(contribution.contributorId))
            contributor.amount += contribution.amount
        }
        for (const crowdloanId of dissolves) {
            if (!crowdloanId) continue

            const crowdloan = assertNotNull(crowdloans.get(crowdloanId))
            crowdloan.status = CrowdloanStatus.Dissolved
        }
        await syncCrowdloans(this.createContext(lastBlock), [...crowdloans.values()])

        for (const crowdloan of crowdloans.values()) {
            if (crowdloan.status !== CrowdloanStatus.Started) continue
            if (crowdloan.endedAt == null || crowdloan.endedAt > lastBlock.height) continue
            crowdloan.status = CrowdloanStatus.Ended
        }

        let parachainIds = new Set<string>()
        for (const { parachainId } of crowdloans.values()) {
            if (!parachainId) continue
            parachainIds.add(parachainId)
        }

        let parachains = await this.ctx.store.findBy(Parachain, { id: In([...parachainIds]) }).then(createEntityMap)
        for (const id of parachainIds) {
            if (parachains.has(id)) continue
            parachains.set(id, createParachain(id))
        }

        let accountIds = new Set<string>()
        contributions.forEach((contribution) => accountIds.add(contribution.accountId))

        let accounts = await this.ctx.store.findBy(Account, { id: In([...accountIds]) }).then(createEntityMap)
        for (const id of accountIds) {
            if (accounts.has(id)) continue
            accounts.set(id, createAccount(id))
        }
        await syncAccounts(this.createContext(lastBlock), [...accounts.values()])

        await this.ctx.store.save([...accounts.values()])
        await this.ctx.store.save([...parachains.values()])
        await this.ctx.store.save([...crowdloans.values()])
        await this.ctx.store.save([...contributors.values()])
        await this.ctx.store.insert(contributions)
    }

    private processItems(blocks: BatchBlock<Item>[]) {
        let contributionData = new BlockMap<ContributedData>()
        // let withdrawData = new BlockMap<ContibutedData>()
        let createdData = new BlockMap<number>()
        let dissolvedData = new BlockMap<number>()

        processItem(blocks, (block, item) => {
            switch (item.name) {
                case 'Crowdloan.Contributed': {
                    const contribution = processContributed({ ...this.ctx, block, event: item.event as any })
                    if (contribution) contributionData.push(block, contribution)
                    return
                }
                case 'Crowdloan.Created': {
                    const paraId = processCreated({ ...this.ctx, block, event: item.event as any })
                    if (paraId != null) createdData.push(block, paraId)
                    return
                }
                case 'Crowdloan.Dissolved': {
                    const paraId = processDissolved({ ...this.ctx, block, event: item.event as any })
                    if (paraId != null) dissolvedData.push(block, paraId)
                    return
                }
            }
        })

        return {
            contributionData,
            createdData,
            dissolvedData,
        }
    }

    private async processContributions(contributionsData: BlockMap<ContributedData>): Promise<Contribution[]> {
        return Promise.all(
            contributionsData.entriesArray().map(async ([block, blockContributionsData]) => {
                const paraIds = [...new Set<number>(blockContributionsData.map((data) => data.paraId))]

                const fundIndecies = await storage.crowdloan.funds
                    .getMany(this.createContext(block), [...paraIds])
                    .then((data) => data?.map((fund) => fund?.fundIndex))

                const crowdloanIds = new Map(fundIndecies?.map((index, i) => [paraIds[i], index?.toString()]))

                return blockContributionsData.map((contributionData) => {
                    const { accountId, amount, paraId } = contributionData
                    const crowdloanId = crowdloanIds.get(paraId)
                    const contributorId = crowdloanId ? createContributorId(crowdloanId, accountId) : undefined
                    return new Contribution({
                        ...getMeta(contributionData),
                        crowdloanId,
                        contributorId,
                        accountId,
                        amount,
                    })
                })
            })
        ).then((data) => data.flat())
    }

    private async processCreations(creationsData: BlockMap<number>): Promise<Crowdloan[]> {
        return Promise.all(
            creationsData.entriesArray().map(async ([block, blockCreationsData]) => {
                const paraIds = [...new Set<number>(blockCreationsData)]

                const funds = await storage.crowdloan.funds
                    .getMany(this.createContext(block), [...paraIds])
                    .then((data) => new Map(data?.map((fund, i) => [paraIds[i].toString(), fund])))

                return blockCreationsData.map((paraId) => {
                    const fund = funds.get(paraId.toString())
                    const crowdloan = createCrowdloan(String(fund?.fundIndex))
                    crowdloan.parachainId = paraId.toString()
                    if (fund) {
                        crowdloan.createdAtTimestamp = new Date(block.timestamp)
                        crowdloan.createdAt = block.height
                        crowdloan.raised = fund.raised
                        crowdloan.cap = fund.cap
                        crowdloan.endedAt = fund.end
                        crowdloan.firstPeriod = fund.firstPeriod
                        crowdloan.lastPeriod = fund.lastPeriod
                    }
                    return crowdloan
                })
            })
        ).then((data) => data.flat())
    }

    private async processDissolves(dissolvedData: BlockMap<number>) {
        return Promise.all(
            dissolvedData.entriesArray().map(async ([block, blockCreationsData]) => {
                const paraIds = [...new Set<number>(blockCreationsData)]

                const ctx = createPrevStorageContext(this.createContext(block))

                const funds = (await storage.crowdloan.funds.getMany(ctx, [...paraIds])) || []
                return funds
                    .map((fund, i) => fund?.fundIndex?.toString())
                    .filter((index): index is string => index != null)
            })
        ).then((data) => data.flat())
    }
}

function createAccount(id: string) {
    return new Account({
        id: id,
        syncedAt: -1,
    })
}

function createParachain(id: string) {
    return new Parachain({
        id: id,
    })
}

function createContributor(id: string) {
    return new Contributor({
        id: id,
        crowdloanId: id.split('-')[0],
        accountId: id.split('-')[1],
        amount: 0n,
    })
}

function createCrowdloan(id: string) {
    return new Crowdloan({
        id: id,
        raised: 0n,
        cap: 0n,
        firstPeriod: 0,
        lastPeriod: 0,
        status: CrowdloanStatus.Started,
        syncedAt: -1,
    })
}

async function syncAccounts(ctx: CommonHandlerContext<Store>, accountsList: Account[]) {
    const accounts = accountsList.filter((s) => s.syncedAt < ctx.block.height)

    accounts.forEach((s) => (s.syncedAt = ctx.block.height))

    return accounts
}

async function syncCrowdloans(ctx: CommonHandlerContext<Store>, crowdloanList: Crowdloan[]) {
    const crowdloans = crowdloanList.filter((s) => s.syncedAt < ctx.block.height)

    const funds = await storage.crowdloan.funds
        .getAll(ctx)
        .then((data) => new Map(data?.map((fund) => [fund.fundIndex.toString(), fund])))

    if (funds.size == 0) return []

    for (const crowdloan of crowdloans) {
        const fund = funds.get(crowdloan.id)

        if (fund) {
            crowdloan.raised = fund.raised
            crowdloan.cap = fund.cap
            crowdloan.endedAt = fund.end
            crowdloan.firstPeriod = fund.firstPeriod
            crowdloan.lastPeriod = fund.lastPeriod
        } else {
            crowdloan.status = CrowdloanStatus.Dissolved
        }
    }

    crowdloans.forEach((s) => (s.syncedAt = ctx.block.height))

    return crowdloans
}

// function createCrowdloanId(paraId: number, fundIndex: number): string {
//     return `${paraId}-${fundIndex}`
// }

function createContributorId(crowdloanId: string, accountId: string): string {
    return `${crowdloanId}-${accountId}`
}

type Item =
    | EventItem<
          'Crowdloan.Contributed',
          {
              event: {
                  args: true
                  extrinsic: { hash: true }
              }
          }
      >
    | EventItem<
          'Crowdloan.Created',
          {
              event: {
                  args: true
              }
          }
      >
    | EventItem<
          'Crowdloan.Dissolved',
          {
              event: {
                  args: true
              }
          }
      >
