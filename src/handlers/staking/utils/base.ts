import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { encodeID, getAccount, getOrCreate, isExtrinsicSuccess, populateMeta } from '../../../common/helpers'
import { RewardData, StakeData } from '../../../types/custom/stakingData'
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

    const id = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    item.account ??= id ? await getAccount(ctx.store, id) : null
    item.amount ??= data.amount
}

function isReward(ctx: EventHandlerContext) {
    return ctx.event.method === 'Rewarded' || ctx.event.method === 'Reward'
}

async function calculateTotalReward(
    reward: Reward,
    options: {
        ctx: EventHandlerContext
        data: RewardData | StakeData
    }
) {
    const { ctx, data } = options

    const id = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    const account = id ? await getAccount(ctx.store, id) : null

    if (!account) return

    account.totalReward = (account.totalReward || 0n) + BigInt(isReward(ctx) ? data.amount : 0n)
    reward.total = account.totalReward

    await ctx.store.save(account)
}

function isStakeBond(ctx: EventHandlerContext) {
    return ctx.event.method !== 'Unbonded' && ctx.extrinsic?.method !== 'unbond'
}

async function calculateTotalStake(
    stake: Stake,
    options: {
        ctx: EventHandlerContext
        data: RewardData | StakeData
    }
) {
    const { ctx, data } = options

    const id = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    const account = id ? await getAccount(ctx.store, id) : null

    if (!account) return

    account.totalStake = isStakeBond(ctx)
        ? (account.totalStake || 0n) + BigInt(data.amount)
        : (account.totalStake || 0n) - BigInt(data.amount)
    stake.total = account.totalStake

    await ctx.store.save(account)
}

export async function saveRewardEvent(ctx: EventHandlerContext, data: RewardData) {
    const id = ctx.event.id

    const reward = await getOrCreate(ctx.store, Reward, id)

    await populateStakingItem(reward, { ctx, data })
    await calculateTotalReward(reward, { ctx, data })

    await ctx.store.save(reward)
}

export async function saveStakeEvent(ctx: EventHandlerContext, data: StakeData, success = true) {
    //NEED TO FIX
    if (ctx.extrinsic) {
        ctx.event.method = ctx.extrinsic.method === 'unbond' ? 'Unbonded' : 'Bonded'
        ctx.event.name = `staking.${ctx.event.method}`
    }

    const id = ctx.event.id

    const stake = await getOrCreate(ctx.store, Stake, id)

    await populateStakingItem(stake, { ctx, data })
    stake.success = success

    await calculateTotalStake(stake, { ctx, data })

    await ctx.store.save(stake)
}

export async function saveStakeCall(ctx: ExtrinsicHandlerContext, data: StakeData) {
    const isAlreadyHandled = ctx.block.events.find(
        (event) =>
            event.extrinsicId === ctx.extrinsic.id &&
            (event.name === 'staking.Bonded' || event.name === 'staking.Unbonded')
    )
    if (isAlreadyHandled) return

    await saveStakeEvent(ctx, data, isExtrinsicSuccess(ctx))
}
