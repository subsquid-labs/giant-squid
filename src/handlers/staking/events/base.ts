import { EventHandlerContext } from '@subsquid/substrate-processor'
import { encodeID, getAccount, getOrCreate, populateMeta } from '../../../common/helpers'
import { RewardData, StakeData } from '../../../common/types/stakingData'
import config from '../../../config'
import { Reward, Stake } from '../../../model'

async function populateStakingItem(
    item: Reward | Stake,
    options: {
        ctx: EventHandlerContext
        data: RewardData | StakeData
    }
) {
    const { ctx, data } = options

    populateMeta(ctx, item)

    item.name ??= ctx.event.name
    item.chainName ??= config.chainName

    const id = encodeID(data.account, config.prefix)
    item.account ??= id ? await getAccount(ctx.store, id) : null
    item.amount ??= data.amount
}

async function calculateTotalReward(
    reward: Reward,
    options: {
        ctx: EventHandlerContext
        data: RewardData | StakeData
    }
) {
    const { ctx, data } = options

    const id = encodeID(data.account, config.prefix)
    const account = id ? await getAccount(ctx.store, id) : null

    if (!account) return

    account.totalReward =
        (account.totalReward || 0n) +
        (ctx.event.method === 'Rewarded' || ctx.event.method === 'Reward' ? data.amount : 0n)
    reward.total = account.totalReward

    await ctx.store.save(account)
}

async function calculateTotalStake(
    stake: Stake,
    options: {
        ctx: EventHandlerContext
        data: RewardData | StakeData
    }
) {
    const { ctx, data } = options

    const id = encodeID(data.account, config.prefix)
    const account = id ? await getAccount(ctx.store, id) : null

    if (!account) return

    account.totalReward = (account.totalReward || 0n) + (ctx.event.method === 'Bonded' ? data.amount : -data.amount)
    stake.total = account.totalReward

    await ctx.store.save(account)
}

export async function saveRewardEvent(ctx: EventHandlerContext, data: RewardData) {
    const id = ctx.event.id

    const reward = await getOrCreate(ctx.store, Reward, id)

    await populateStakingItem(reward, { ctx, data })
    await calculateTotalReward(reward, { ctx, data })

    await ctx.store.save(reward)
}

export async function saveStakeEvent(ctx: EventHandlerContext, data: StakeData) {
    const id = ctx.event.id

    const stake = await getOrCreate(ctx.store, Stake, id)

    await populateStakingItem(stake, { ctx, data })
    await calculateTotalStake(stake, { ctx, data })

    await ctx.store.save(stake)
}
