import { EventHandlerContext, ExtrinsicHandlerContext, toHex } from '@subsquid/substrate-processor'
import { encodeID, isExtrinsicSuccess, populateMeta } from '../../../common/helpers'
import { RewardData, StakeData } from '../../../types/custom/stakingData'
import config from '../../../config'
import { Reward, Bond } from '../../../model'
import { accountManager, chainManager } from '../../../managers'

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

    const id = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!id) return undefined

    item.account = await accountManager.get(ctx, id)
    item.smartContract = toHex(data.smartContract)
    item.amount = data.amount

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

    const account = reward.account

    account.totalReward = (account.totalReward || 0n) + data.amount
    reward.total = account.totalReward

    await ctx.store.save(account)
}

function isStakeBond(ctx: EventHandlerContext) {
    return ctx.event.method !== 'UnbondUnstakeAndWithdraw' && ctx.extrinsic?.method !== 'unbond_unstake_and_withdraw'
}

async function calculateTotalStake(
    stake: Bond,
    options: {
        ctx: EventHandlerContext
        data: RewardData | StakeData
    }
) {
    const { ctx, data } = options

    const account = stake.account

    account.totalBond = isStakeBond(ctx)
        ? BigInt(account.totalBond || 0n) + BigInt(data.amount)
        : BigInt(account.totalBond || 0n) - BigInt(data.amount)
    account.totalBond = account.totalBond > 0n ? account.totalBond : 0n
    stake.total = account.totalBond

    await ctx.store.save(account)
}

export async function saveRewardEvent(ctx: EventHandlerContext, data: RewardData) {
    const id = ctx.event.id

    const reward = new Reward({ id })

    if (!(await populateStakingItem(reward, { ctx, data }))) return
    reward.era = data.era
    await calculateTotalReward(reward, { ctx, data })

    await ctx.store.insert(Reward, reward)
}

export async function saveStakeEvent(ctx: EventHandlerContext, data: StakeData, success = true) {
    //NEED TO FIX
    if (ctx.extrinsic) {
        ctx.event.method =
            ctx.extrinsic.method === 'unbond_unstake_and_withdraw' ? 'UnbondUnstakeAndWithdraw' : 'BondAndStake'
        ctx.event.name = `dappsStaking.${ctx.event.method}`
    }

    const id = ctx.event.id

    const stake = new Bond({ id })

    if (!(await populateStakingItem(stake, { ctx, data }))) return
    stake.success = success

    await calculateTotalStake(stake, { ctx, data })

    await ctx.store.insert(Bond, stake)
}

export async function saveStakeCall(ctx: ExtrinsicHandlerContext, data: StakeData) {
    await saveStakeEvent(ctx, data, isExtrinsicSuccess(ctx))
}
