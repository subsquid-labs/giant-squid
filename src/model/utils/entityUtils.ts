import { EventHandlerContext } from '@subsquid/substrate-processor'
import chains from '../../chains'
import config from '../../config'
import { Account, Chain, Contributor, Crowdloan, CrowdloanStatus, Parachain, Token } from '..'
import storage from '../../storage'
import { ChainInfo, ChainName } from '../../types/custom/chainInfo'

export async function getChain(ctx: EventHandlerContext, id: ChainName, data?: Partial<Chain>): Promise<Chain> {
    let chain = await ctx.store.findOne(Chain, id, { cache: true })

    if (!chain) {
        const chainInfo = chains.find((ch) => ch.id === id) as ChainInfo

        chain = new Chain({
            id,
            token: new Token({
                symbol: chainInfo.token,
                decimals: chainInfo.decimals,
            }),
            ...data,
        })

        await ctx.store.insert(Chain, chain)
    }

    return chain
}

export async function getParachain(
    ctx: EventHandlerContext,
    id: number | string,
    data?: Partial<Parachain>
): Promise<Parachain> {
    let parachain = await ctx.store.findOne(Parachain, id, { cache: true })

    if (!parachain) {
        const chainInfo = chains.find((ch) => ch.paraId === id && ch.relay === config.chainName)

        parachain = new Parachain({
            id: id.toString(),
            name: chainInfo?.id,
            relayChain: await getChain(ctx, config.chainName),
            ...data,
        })

        await ctx.store.insert(Parachain, parachain)
    }

    return parachain
}

export async function getCrowdloan(
    ctx: EventHandlerContext,
    id: number | string,
    data?: Partial<Crowdloan>
): Promise<Crowdloan | undefined> {
    const fundInfo = await storage.crowdloan.getFunds(ctx, Number(id))
    if (!fundInfo) return undefined

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
            status: CrowdloanStatus.CREATED,
            parachain: await getParachain(ctx, id),
            chain: await getChain(ctx, config.chainName),
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
    let account = await ctx.store.findOne(Account, id, { cache: true })

    if (!account) {
        account = new Account({
            id: id.toString(),
            totalReward: 0n,
            totalStake: 0n,
            totalSlash: 0n,
            chain: await getChain(ctx, config.chainName),
            ...data,
        })

        await ctx.store.insert(Account, account)
    }

    return account
}
