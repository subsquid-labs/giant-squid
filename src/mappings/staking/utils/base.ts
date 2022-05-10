import { EventHandlerContext, toHex } from '@subsquid/substrate-processor'
import { populateMeta } from '../../../common/helpers'
import { RewardData, StakeData } from '../../../types/custom/stakingData'
import config from '../../../config'
import { Bond, Reward } from '../../../model'
import { accountManager, chainManager, roundManager } from '../../../managers'
import { AddressNotDecoded } from '../../../common/errors'

async function populateStakingItem(
    item: Reward | Bond,
    options: {
        ctx: EventHandlerContext
        data: RewardData | StakeData
    }
): Promise<Reward | Bond | undefined> {
    const { ctx, data } = options

    populateMeta(ctx, item)

    item.name = ctx.event.name
    item.chain = await chainManager.get(ctx, config.chainName)

    const id = data.account ? toHex(data.account) : ctx.extrinsic?.signer
    if (!id) throw new AddressNotDecoded([data.account])

    item.account = await accountManager.get(ctx, id)
    item.amount = data.amount

    return item
}

async function calculateTotalReward(
    reward: Reward,
    options: {
        ctx: EventHandlerContext
        data: RewardData
    }
) {
    const { ctx, data } = options

    const { account } = reward

    account.totalReward = (account.totalReward || 0n) + data.amount
    reward.total = account.totalReward

    await ctx.store.save(account)
}

async function calculateTotalStake(
    stake: Bond,
    options: {
        ctx: EventHandlerContext
        data: StakeData
    }
) {
    const { ctx, data } = options

    const { account } = stake

    account.totalBond = BigInt(account.totalBond || 0n) + BigInt(data.amount)
    account.totalBond = account.totalBond > 0n ? account.totalBond : 0n
    stake.total = account.totalBond
    stake.inBuildTotal = data.newTotal

    await ctx.store.save(account)
}

export async function saveRewardedEvent(ctx: EventHandlerContext, data: RewardData): Promise<void> {
    const { id } = ctx.event

    const reward = new Reward({ id })

    if (!(await populateStakingItem(reward, { ctx, data }))) return
    await calculateTotalReward(reward, { ctx, data })

    reward.round = await roundManager.getRoundNumberForRewards(ctx)

    await ctx.store.insert(Reward, reward)
}

export async function saveStakeEvent(ctx: EventHandlerContext, data: StakeData, success = true): Promise<void> {
    const { id } = ctx.event

    const stake = new Bond({ id })

    if (!(await populateStakingItem(stake, { ctx, data }))) return
    stake.success = success

    await calculateTotalStake(stake, { ctx, data })

    await ctx.store.insert(Bond, stake)
}
