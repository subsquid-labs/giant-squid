import * as events from './events'
import * as extrinsics from './calls'
import { BatchBlock, BatchContext, CommonHandlerContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { Account, Bond, PayeeType, Reward, Slash, Staker, StakingRole } from '../../model'
import { processRewarded, processSlashed, RewardData, SlashData } from './events'
import { createEntityMap, getOriginAccountId, last, processItem } from '../../common/tools'
import { In } from 'typeorm'
import { getMeta } from '../util/actions'
import storage from '../../storage'
import { CallItem, EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { BondData, processBond } from './events/bond'
import { processUnbond, UnbondData } from './events/unbond'
import { BlockMap } from '../../common/blockMap'
import { MappingProcessor } from '../../common/mappingProcessor'

export default {
    events,
    extrinsics,
}

type RoleUpdateData = { controllerId: string; role: 'validator' | 'nominator' | 'idle' }

export class StakingProcessor extends MappingProcessor<Item> {
    async run(blocks: BatchBlock<Item>[]) {
        const { rewardsData, slashesData, bondsData, setControllersData, setPayeesData, roleUpdateData } =
            this.processItems(blocks)

        const [rewards, slashes, bonds, roleUpdates] = await Promise.all([
            this.processRewards(
                rewardsData.optimize((block, items) => {
                    if (setControllersData.has(block)) {
                        const stashesIds: string[] = setControllersData.get(block)?.map((data) => data.stashId) || []
                        return items.some((item) => stashesIds.includes(item.stashId))
                    } else {
                        return setPayeesData.has(block)
                    }
                })
            ),
            this.processSlashes(slashesData),
            this.processBonds(bondsData),
            this.processRoleUpdates(roleUpdateData),
        ])

        const accountsIds = new Set<string>()
        const stakersIds = new Set<string>()
        rewards.forEach((reward) => {
            if (reward.accountId) accountsIds.add(reward.accountId)
            stakersIds.add(reward.stakerId)
        })
        slashes.forEach((slash) => {
            accountsIds.add(slash.accountId)
            stakersIds.add(slash.stakerId)
        })
        bonds.forEach((bond) => {
            accountsIds.add(bond.accountId)
            stakersIds.add(bond.stakerId)
        })
        roleUpdates.forEach((roleUpdate) => {
            if (roleUpdate.stakerId) stakersIds.add(roleUpdate.stakerId)
        })

        const lastBlock = last(blocks).header

        const stakers = await this.ctx.store.findBy(Staker, { id: In([...stakersIds]) }).then(createEntityMap)
        for (const id of stakersIds) {
            if (stakers.has(id)) continue
            stakers.set(id, createStaker(id))
        }
        slashes.forEach((slash) => {
            const staker = stakers.get(slash.stakerId)
            if (staker) staker.totalSlash += slash.amount
        })
        rewards.forEach((reward) => {
            const staker = stakers.get(reward.stakerId)
            if (staker) staker.totalReward += reward.amount
        })
        roleUpdates.forEach((roleUpdate) => {
            const staker = stakers.get(roleUpdate.stakerId)
            if (staker) staker.role = roleUpdate.role
        })
        await syncStakers({ ...this.ctx, block: lastBlock }, [...stakers.values()])
        stakers.forEach((staker) => {
            accountsIds.add(staker.stashId)
            if (staker.controllerId) accountsIds.add(staker.controllerId)
            if (staker.payeeId) accountsIds.add(staker.payeeId)
        })

        const accounts = await this.ctx.store.findBy(Account, { id: In([...accountsIds]) }).then(createEntityMap)
        for (const id of accountsIds) {
            if (accounts.has(id)) continue
            accounts.set(id, createAccount(id))
        }
        await syncAccounts({ ...this.ctx, block: lastBlock }, [...accounts.values()])

        await this.ctx.store.save([...accounts.values()])
        await this.ctx.store.save([...stakers.values()])
        await this.ctx.store.insert(rewards)
        await this.ctx.store.insert(slashes)
        await this.ctx.store.insert(bonds)
    }

    private processItems(blocks: BatchBlock<Item>[]) {
        const rewardsData = new BlockMap<RewardData>()
        const slashesData = new BlockMap<SlashData>()
        const bondsData = new BlockMap<BondData | UnbondData>()
        const setControllersData = new BlockMap<{ stashId: string }>()
        const setPayeesData = new BlockMap<{ controllerId: string }>()
        const roleUpdateData = new BlockMap<RoleUpdateData>()
        processItem(blocks, (block, item) => {
            switch (item.name) {
                case 'Staking.Reward':
                case 'Staking.Rewarded': {
                    const reward = processRewarded({ ...this.ctx, block, event: item.event as any })
                    if (reward) rewardsData.push(block, reward)
                    return
                }
                case 'Staking.Slash':
                case 'Staking.Slashed': {
                    const slash = processSlashed({ ...this.ctx, block, event: item.event as any })
                    if (slash) rewardsData.push(block, slash)
                    return
                }
                case 'Staking.Bonded': {
                    const bond = processBond({ ...this.ctx, block, event: item.event as any })
                    if (bond) bondsData.push(block, bond)
                    return
                }
                case 'Staking.Unbonded': {
                    const bond = processUnbond({ ...this.ctx, block, event: item.event as any })
                    if (bond) bondsData.push(block, bond)
                    return
                }
                case 'Staking.set_controller': {
                    const stashId = getOriginAccountId(item.call.origin)
                    if (stashId) setControllersData.push(block, { stashId })
                    return
                }
                case 'Staking.set_payee': {
                    const controllerId = getOriginAccountId(item.call.origin)
                    if (controllerId) setPayeesData.push(block, { controllerId })
                    return
                }
                case 'Staking.nominate': {
                    const controllerId = getOriginAccountId(item.call.origin)
                    if (controllerId) roleUpdateData.push(block, { controllerId, role: 'nominator' })
                    return
                }
                case 'Staking.validate': {
                    const controllerId = getOriginAccountId(item.call.origin)
                    if (controllerId) roleUpdateData.push(block, { controllerId, role: 'validator' })
                    return
                }
                case 'Staking.chill': {
                    const controllerId = getOriginAccountId(item.call.origin)
                    if (controllerId) roleUpdateData.push(block, { controllerId, role: 'idle' })
                    return
                }
            }
        })

        return {
            rewardsData,
            slashesData,
            bondsData,
            setControllersData,
            setPayeesData,
            roleUpdateData,
        }
    }

    private async processRewards(rewardsData: BlockMap<RewardData>): Promise<Reward[]> {
        return Promise.all(
            rewardsData.entriesArray().map(async ([block, blockRewardsData]) => {
                const blockCtx = { ...this.ctx, block }

                const stakersIdsSet = new Set<string>()

                for (const rewardData of blockRewardsData) {
                    stakersIdsSet.add(rewardData.stashId)
                }

                const stakersIds = [...stakersIdsSet]
                const payeeIds = new Map<string, string>()

                const controllerPayees: string[] = []
                await storage.staking.payee.getMany(blockCtx, stakersIds).then((payees) =>
                    payees?.forEach((payee, i) => {
                        payee.dest === 'Account'
                            ? payeeIds.set(stakersIds[i], payee.accountId!)
                            : payee.dest === 'Controller'
                            ? controllerPayees.push(stakersIds[i])
                            : payee.dest === 'Staked' || payee.dest === 'Stash'
                            ? payeeIds.set(stakersIds[i], stakersIds[i])
                            : null
                    })
                )
                await storage.staking.bonded
                    .getMany(blockCtx, controllerPayees)
                    .then((ids) => ids?.forEach((id, i) => payeeIds.set(controllerPayees[i], id!)))

                return blockRewardsData.map((rewardData) => {
                    const { stashId, validatorId, era, amount } = rewardData
                    const payeeId = payeeIds.get(rewardData.stashId)
                    return new Reward({
                        ...getMeta(rewardData),
                        stakerId: stashId,
                        accountId: payeeId,
                        validatorId: validatorId,
                        amount,
                        era,
                    })
                })
            })
        ).then((data) => data.flat())
    }

    private async processSlashes(slashesData: BlockMap<SlashData>) {
        return Promise.all(
            slashesData.entriesArray().map(async ([block, blockSlashData]) => {
                const blockCtx = { ...this.ctx, block }

                const era =
                    (await storage.staking.getActiveEra(blockCtx).then((d) => d?.index)) ??
                    (await storage.staking.getCurrentEra(blockCtx).then((d) => d?.index))

                return blockSlashData.map((slashData) => {
                    const { stashId, amount } = slashData
                    return new Slash({
                        ...getMeta(slashData),
                        stakerId: stashId,
                        accountId: stashId,
                        amount,
                        era,
                    })
                })
            })
        ).then((data) => data.flat())
    }

    private async processBonds(bondsData: BlockMap<BondData | UnbondData>) {
        return Promise.all(
            bondsData.entriesArray().map(async ([, blockBondsData]) => {
                return blockBondsData.map((bondData) => {
                    const { type, amount, stashId } = bondData
                    return new Bond({
                        ...getMeta(bondData),
                        stakerId: stashId,
                        accountId: stashId,
                        amount,
                        type,
                    })
                })
            })
        ).then((data) => data.flat())
    }

    private async processRoleUpdates(roleUpdatesData: BlockMap<RoleUpdateData>) {
        return Promise.all(
            roleUpdatesData.entriesArray().map(async ([block, blockRoleUpdatesData]) => {
                const blockCtx = this.createContext(block)
                const controllerIds = blockRoleUpdatesData.map((roleUpdateData) => roleUpdateData.controllerId)
                const stashesIds = (await storage.staking.bonded.getMany(blockCtx, controllerIds)) || []

                const data: { stakerId: string; role: StakingRole }[] = []
                for (let i = 0; i < stashesIds.length; i++) {
                    const stashId = stashesIds[i]
                    if (stashId)
                        data.push({
                            stakerId: stashId,
                            role:
                                blockRoleUpdatesData[i].role === 'validator'
                                    ? StakingRole.Validator
                                    : blockRoleUpdatesData[i].role === 'nominator'
                                    ? StakingRole.Nominator
                                    : StakingRole.Idle,
                        })
                }
                return data
            })
        ).then((data) => data.flat())
    }
}

function createStaker(id: string) {
    return new Staker({
        id: id,
        stashId: id,
        activeBond: 0n,
        totalReward: 0n,
        totalSlash: 0n,
        role: null,

        syncedAt: -1,
    })
}

function createAccount(id: string) {
    return new Account({
        id: id,
        syncedAt: -1,
    })
}

async function syncStakers(ctx: CommonHandlerContext<Store>, stakersList: Staker[]) {
    const stakers = stakersList.filter((s) => s.syncedAt < ctx.block.height)

    await storage.staking.bonded
        .getMany(
            ctx,
            stakers.map((s) => s.stashId)
        )
        .then((ids) => ids?.forEach((id, i) => (stakers[i].controllerId = id)))

    const stakersWithControllers = stakers.filter((s) => s.controllerId != null)
    await storage.staking.ledger
        .getMany(
            ctx,
            stakersWithControllers.map((s) => s.controllerId!)
        )
        .then((ledgers) =>
            ledgers?.forEach(
                (ledger, i) =>
                    (stakersWithControllers[i].activeBond = ledger?.active ?? stakersWithControllers[i].activeBond)
            )
        )

    await storage.staking.payee
        .getMany(
            ctx,
            stakers.map((s) => s.stashId)
        )
        .then((payees) =>
            payees?.forEach((payee, i) => {
                const s = stakers[i]
                s.payeeType = payee.dest as PayeeType
                s.payeeId =
                    payee.dest === 'Account'
                        ? payee.accountId
                        : payee.dest === 'Controller'
                        ? s.controllerId
                        : payee.dest === 'Staked' || payee.dest === 'Stash'
                        ? s.stashId
                        : null
            })
        )

    stakers.forEach((s) => (s.syncedAt = ctx.block.height))
    return stakers
}

async function syncAccounts(ctx: CommonHandlerContext<Store>, accountsList: Account[]) {
    const accounts = accountsList.filter((s) => s.syncedAt < ctx.block.height)

    accounts.forEach((s) => (s.syncedAt = ctx.block.height))

    return accounts
}

type Item =
    | EventItem<
          'Staking.Reward',
          {
              event: {
                  args: true
                  call: { args: true }
                  extrinsic: { hash: true }
              }
          }
      >
    | EventItem<
          'Staking.Rewarded',
          {
              event: {
                  args: true
                  call: { args: true }
                  extrinsic: { hash: true }
              }
          }
      >
    | EventItem<
          'Staking.Slashed',
          {
              event: {
                  args: true
                  extrinsic: { hash: true }
              }
          }
      >
    | EventItem<
          'Staking.Slash',
          {
              event: {
                  args: true
                  extrinsic: { hash: true }
              }
          }
      >
    | EventItem<
          'Staking.Bonded',
          {
              event: {
                  args: true
                  extrinsic: { hash: true }
              }
          }
      >
    | EventItem<
          'Staking.Unbonded',
          {
              event: {
                  args: true
                  extrinsic: { hash: true }
              }
          }
      >
    | CallItem<'Staking.set_controller', { call: { origin: true } }>
    | CallItem<'Staking.set_payee', { call: { origin: true } }>
    | CallItem<'Staking.nominate', { call: { origin: true } }>
    | CallItem<'Staking.validate', { call: { origin: true } }>
    | CallItem<'Staking.chill', { call: { origin: true } }>

    def 