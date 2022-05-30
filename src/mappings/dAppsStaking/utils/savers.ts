import { EventHandlerContext } from '@subsquid/substrate-processor'
import { getMeta } from '../../../common/helpers'
import { Bond, BondType, Reward } from '../../../model'
import { accountManager } from '../../../managers'
import { RewardData, BondData } from './types'

export async function saveReward(ctx: EventHandlerContext, data: RewardData) {
    const id = ctx.event.id

    const account = await accountManager.get(ctx, data.account)
    account.totalReward = account.totalReward + data.amount

    await ctx.store.insert(Reward, {
        id,
        ...getMeta(ctx),
        account,
        amount: data.amount,
        total: account.totalReward,
        smartContract: data.smartContract,
    })

    await accountManager.update(ctx, account)
}

export async function saveBond(ctx: EventHandlerContext, data: BondData) {
    const id = ctx.event.id

    const account = await accountManager.get(ctx, data.account)

    if (data.success) {
        account.activeBond =
            data.type === BondType.Bond
                ? BigInt(account.activeBond) + BigInt(data.amount)
                : BigInt(account.activeBond) - BigInt(data.amount)
        account.activeBond = account.activeBond > 0n ? account.activeBond : 0n
    }

    await ctx.store.insert(Bond, {
        id,
        ...getMeta(ctx),
        account,
        type: data.type,
        amount: data.amount,
        total: account.activeBond,
        success: data.success,
    })

    await accountManager.update(ctx, account)
}
