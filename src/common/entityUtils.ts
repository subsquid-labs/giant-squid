import { EventHandlerContext } from '@subsquid/substrate-processor'
import config from '../config'
import { Account, Contributor, Crowdloan, CrowdloanStatus, Parachain } from '../model'
import { CrowdloanFundsStorage } from '../types/generated/storage'
import { FundInfo } from '../types/generated/v9110'

export async function getParachain(
    ctx: EventHandlerContext,
    id: number | string,
    data?: Partial<Parachain>
): Promise<Parachain> {
    let parachain = await ctx.store.findOne(Parachain, id, { cache: true })

    if (!parachain) {
        parachain = new Parachain({ id: id.toString(), ...data })

        await ctx.store.insert(Parachain, parachain)
    }

    return parachain
}

const crowdloanCache: {
    lastBlockHash?: string
    value?: FundInfo
} = {}

export async function getCrowdloan(
    ctx: EventHandlerContext,
    id: number | string,
    data?: Partial<Crowdloan>
): Promise<Crowdloan | undefined> {
    let fundInfo: FundInfo

    if (crowdloanCache.lastBlockHash !== ctx.block.hash || !crowdloanCache.value) {
        const storage = new CrowdloanFundsStorage(ctx)
        if (!storage.isExists) return undefined

        fundInfo = await storage.getAsV9110(Number(id))
        if (!fundInfo) return undefined

        crowdloanCache.lastBlockHash = ctx.block.hash
        crowdloanCache.value = fundInfo
    } else {
        fundInfo = crowdloanCache.value
    }

    const { trieIndex, end, firstPeriod, lastPeriod, cap } = fundInfo

    let crowdloan = await ctx.store.findOne(Crowdloan, `${id}-${trieIndex}`, { cache: true })

    if (!crowdloan) {
        crowdloan = new Crowdloan({
            id: `${id}-${trieIndex}`,
            cap,
            raised: 0n,
            end: BigInt(end),
            lastPeriod: BigInt(lastPeriod),
            firstPeriod: BigInt(firstPeriod),
            blockNumber: BigInt(ctx.block.height),
            parachain: await getParachain(ctx, id),
            status: CrowdloanStatus.CREATED,
            chainName: config.chainName,
            ...data,
        })

        await ctx.store.insert(Crowdloan, crowdloan)
    }

    return crowdloan
}

export async function getContributor(
    ctx: EventHandlerContext,
    id: number | string,
    data?: Partial<Contributor>
): Promise<Contributor> {
    let contributor = await ctx.store.findOne(Contributor, id)

    if (!contributor) {
        contributor = new Contributor({
            id: id.toString(),
            amount: 0n,
            ...data,
        })

        await ctx.store.insert(Contributor, contributor)
    }

    return contributor
}

export async function getAccount(
    ctx: EventHandlerContext,
    id: number | string,
    data?: Partial<Account>
): Promise<Account> {
    let account = await ctx.store.findOne(Account, id)

    if (!account) {
        account = new Account({
            id: id.toString(),
            totalReward: 0n,
            totalStake: 0n,
            totalSlash: 0n,
            ...data,
        })

        await ctx.store.insert(Account, account)
    }

    return account
}
