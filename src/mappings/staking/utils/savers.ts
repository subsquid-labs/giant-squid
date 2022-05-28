import { EventHandlerContext } from '@subsquid/substrate-processor'
import { getMeta, saturatingSumBigInt } from '../../../common/helpers'
import { Bond, BondType, Reward } from '../../../model'
import { accountManager, roundManager } from '../../../managers'
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
        round: await roundManager.getRoundIndexForRewards(ctx),
    })

    await accountManager.update(ctx, account)
}

export async function saveBond(ctx: EventHandlerContext, data: BondData) {
    const id = ctx.event.id

    const account = await accountManager.get(ctx, data.account)

    if (data.success) {
        account.activeBond = data.newTotal
            ? data.newTotal
            : saturatingSumBigInt(account.activeBond, data.amount * (data.type === BondType.Bond ? 1n : -1n))
    }

    await ctx.store.insert(Bond, {
        id,
        ...getMeta(ctx),
        account,
        candidate: data.candidate,
        type: data.type,
        amount: data.amount,
        total: account.activeBond,
        success: data.success,
    })

    await accountManager.update(ctx, account)
}
