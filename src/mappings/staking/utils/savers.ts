import { EventHandlerContext } from '@subsquid/substrate-processor'
import { getMeta } from '../../../common/helpers'
import { Bond, BondType, PayeeType, Reward, Slash } from '../../../model'
import { accountManager, stakingInfoManager } from '../../../managers'
import { RewardData, SlashData, BondData } from './types'

export async function saveReward(ctx: EventHandlerContext, data: RewardData) {
    const id = ctx.event.id

    const account = await accountManager.get(ctx, data.account)
    account.totalReward = account.totalReward + data.amount

    const stakingInfo = await stakingInfoManager.get(ctx, account.id)
    if (!stakingInfo) return

    if (stakingInfo?.payeeType === PayeeType.Staked) {
        account.activeBond = account.activeBond + data.amount
    }

    await ctx.store.insert(Reward, {
        id,
        ...getMeta(ctx),
        account,
        amount: data.amount,
        total: account.totalReward,
    })

    await accountManager.update(ctx, account)
}

export async function saveSlash(ctx: EventHandlerContext, data: SlashData) {
    const id = ctx.event.id

    const account = await accountManager.get(ctx, data.account)

    const stakingInfo = await stakingInfoManager.get(ctx, account.id)
    if (!stakingInfo) return

    account.totalSlash = account.totalSlash + data.amount
    account.activeBond = account.activeBond - data.amount
    account.activeBond = account.activeBond > 0n ? account.activeBond : 0n

    await ctx.store.insert(Slash, {
        id,
        ...getMeta(ctx),
        account,
        amount: data.amount,
        total: account.totalSlash,
        era: data.era,
    })

    await accountManager.update(ctx, account)
}

export async function saveBond(ctx: EventHandlerContext, data: BondData) {
    const id = ctx.event.id

    const account = await accountManager.get(ctx, data.account)

    const stakingInfo = await stakingInfoManager.get(ctx, account.id)
    if (!stakingInfo) return

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
