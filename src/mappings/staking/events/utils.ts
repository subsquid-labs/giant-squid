import { saturatingSumBigInt } from '../../../common/tools'
import { Bond, BondType, Round } from '../../../model'
import { CommonHandlerContext, EventHandlerContext } from '../../types/contexts'
import { ActionData } from '../../types/data'
import { getMeta } from '../../util/actions'
import { getOrCreateAccount } from '../../util/entities'

export interface RewardData extends ActionData {
    amount: bigint
    accountId: string
}

export interface BondData extends ActionData {
    amount: bigint
    accountId: string
    type: BondType
    success: boolean
    newTotal?: bigint
    candidateId?: string
}

export async function saveReward(ctx: CommonHandlerContext, data: RewardData) {
    const account = await getOrCreateAccount(ctx, data.accountId)
    account.totalReward = account.totalReward + data.amount

    await ctx.store.save(account)

    const round = await ctx.store.get(Round, { order: { index: 'DESC' } })

    await ctx.store.insert({
        ...getMeta(data),
        account,
        amount: data.amount,
        round: Math.min((round?.index || 0) - 4, 0),
    })
}

export async function saveBond(ctx: CommonHandlerContext, data: BondData) {
    const account = await getOrCreateAccount(ctx, data.accountId)

    if (data.success) {
        account.activeBond = data.newTotal
            ? data.newTotal
            : saturatingSumBigInt(account.activeBond, data.amount * (data.type === BondType.Bond ? 1n : -1n))
    }

    await ctx.store.save(account)

    await ctx.store.insert({
        ...getMeta(data),
        account,
        candidate: data.candidateId,
        type: data.type,
        amount: data.amount,
        total: account.activeBond,
        success: data.success,
    })
}

export async function isDoubleEvent(ctx: EventHandlerContext, accountId: string, amount: bigint, type: BondType) {
    return (
        (await ctx.store.count(Bond, {
            where: {
                extrinsicHash: ctx.event.extrinsic?.hash,
                blockNumber: ctx.block.height,
                accountId,
                amount,
                type,
            },
        })) > 0
    )
}
