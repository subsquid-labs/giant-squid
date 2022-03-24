import { EventHandlerContext } from '@subsquid/substrate-processor'
import chains from '../../chains'
import config from '../../config'
import { Account, Chain, Contributor, Crowdloan, Token } from '../generated'
import * as modules from '../../mappings'
import { ChainInfo, ChainName } from '../../types/custom/chainInfo'
import { MoreThan } from 'typeorm'

export async function getChain(ctx: EventHandlerContext, id: ChainName, data?: Partial<Chain>): Promise<Chain> {
    let chain = await ctx.store.findOne(Chain, id, { cache: true })

    if (!chain) {
        const chainInfo = chains.find((ch) => ch.name === id)!

        chain = new Chain({
            id,
            token: new Token(chainInfo.tokens[0]),
            paraId: chainInfo.paraId,
            relayChain: chainInfo.relay ? await getChain(ctx, chainInfo.relay) : null,
            ...data,
        })

        await ctx.store.insert(Chain, chain)
    }

    return chain
}

export async function getParachain(
    ctx: EventHandlerContext,
    id: number,
    data?: Partial<Chain>
): Promise<Chain | undefined> {
    const chainInfo = chains.find((ch) => ch.paraId === id && ch.relay === config.chainName)
    if (!chainInfo) return undefined

    const chain = await getChain(ctx, chainInfo.name)

    return chain
}

export async function getCrowdloan(
    ctx: EventHandlerContext,
    id: number,
    data?: Partial<Crowdloan>
): Promise<Crowdloan | undefined> {
    let crowdloan = await ctx.store
        .createQueryBuilder(Crowdloan, 'crowdloan')
        .innerJoin(Chain, "parachain", "crowdloan.parachain_id = parachain.id")
        .where('parachain.para_id = :id', { id })
        .andWhere('crowdloan.end > :height', { height: ctx.block.height })
        .cache(true)
        .getOne()

    if (crowdloan) return crowdloan

    const fundInfo = await modules.crowdloan.storage.getFunds(ctx, id)
    if (!fundInfo) return undefined

    const { trieIndex, end, firstPeriod, lastPeriod, cap } = fundInfo

    crowdloan = await ctx.store.findOne(Crowdloan, `${id}-${trieIndex}`, { cache: true })

    if (!crowdloan) {
        crowdloan = new Crowdloan({
            id: `${id}-${trieIndex}`,
            cap,
            raised: 0n,
            end: BigInt(end),
            lastPeriod: BigInt(lastPeriod),
            firstPeriod: BigInt(firstPeriod),
            blockNumber: BigInt(ctx.block.height),
            parachain: await getParachain(ctx, Number(id)),
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
            totalBond: 0n,
            totalSlash: 0n,
            chain: await getChain(ctx, config.chainName),
            ...data,
        })

        await ctx.store.insert(Account, account)
    }

    return account
}
