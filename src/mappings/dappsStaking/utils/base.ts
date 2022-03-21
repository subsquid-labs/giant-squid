import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { encodeID, isExtrinsicSuccess, populateMeta } from '../../../common/helpers'
import { RewardData, StakeData } from '../../../types/custom/stakingData'
import config from '../../../config'
import { Reward, Stake, getAccount, getChain } from '../../../model'

async function populateStakingItem(
    item: Reward | Stake,
    options: {
        ctx: EventHandlerContext
        data: RewardData | StakeData
    }
): Promise<Reward | Stake | undefined> {
    const { ctx, data } = options

    populateMeta(ctx, item)

    item.name = ctx.event.name
    item.chain = await getChain(ctx, config.chainName)

    const id = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!id) return undefined

    item.account = await getAccount(ctx, id)
    item.amount = data.amount
    item.smartContract = `0x${Buffer.from(data.smartConstract).toString('hex')}`

    return item
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
    if (!id) return

    const account = await getAccount(ctx, id)

    account.totalReward = (account.totalReward || 0n) + BigInt(data.amount)
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
    if (!id) return

    const account = await getAccount(ctx, id)

    if (!account) return

    account.totalStake = isStakeBond(ctx)
        ? (account.totalStake || 0n) + BigInt(data.amount)
        : (account.totalStake || 0n) - BigInt(data.amount)
    account.totalStake = account.totalStake > 0 ? account.totalStake : 0n
    stake.total = account.totalStake

    await ctx.store.save(account)
}

export async function saveRewardEvent(ctx: EventHandlerContext, data: RewardData) {
    const id = ctx.event.id

    const reward = new Reward({ id })

    if (!(await populateStakingItem(reward, { ctx, data }))) return
    await calculateTotalReward(reward, { ctx, data })

    await ctx.store.insert(Reward, reward)
}

export async function saveStakeEvent(ctx: EventHandlerContext, data: StakeData, success = true) {
    const id = ctx.event.id

    const stake = new Stake({ id })

    if (!(await populateStakingItem(stake, { ctx, data }))) return
    stake.success = success

    await calculateTotalStake(stake, { ctx, data })

    await ctx.store.insert(Stake, stake)
}

export async function saveStakeCall(ctx: ExtrinsicHandlerContext, data: StakeData) {
    await saveStakeEvent(ctx, data, isExtrinsicSuccess(ctx))
}
