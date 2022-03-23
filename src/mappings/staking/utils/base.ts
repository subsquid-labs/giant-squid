import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { encodeID, isExtrinsicSuccess, populateMeta } from '../../../common/helpers'
import { RewardData, StakeData } from '../../../types/custom/stakingData'
import config from '../../../config'
import { Reward, Slash, getAccount, getChain, Bond } from '../../../model'

async function populateStakingItem(
    item: Reward | Slash,
    options: {
        ctx: EventHandlerContext
        data: RewardData | StakeData
    }
): Promise<Reward | Slash | undefined> {
    const { ctx, data } = options

    populateMeta(ctx, item)

    item.name = ctx.event.name
    item.chain = await getChain(ctx, config.chainName)

    const id = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!id) return undefined

    item.account = await getAccount(ctx, id)
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

    const id = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!id) return

    const account = await getAccount(ctx, id)

    account.totalReward = (account.totalReward || 0n) + BigInt(data.amount)
    reward.total = account.totalReward

    account.totalBond = (account.totalBond || 0n) + BigInt(data.amount)

    await ctx.store.save(account)
}

async function calculateTotalSlash(
    slash: Slash,
    options: {
        ctx: EventHandlerContext
        data: RewardData | StakeData
    }
) {
    const { ctx, data } = options

    const id = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!id) return

    const account = await getAccount(ctx, id)

    account.totalSlash = (account.totalSlash || 0n) + BigInt(data.amount)
    slash.total = account.totalSlash

    account.totalBond = (account.totalBond || 0n) - BigInt(data.amount)
    account.totalBond = account.totalBond > 0n ? account.totalBond : 0n

    await ctx.store.save(account)
}

function isStakeBond(ctx: EventHandlerContext) {
    return ctx.event.method !== 'Unbonded' && ctx.extrinsic?.method !== 'unbond'
}

async function calculateTotalStake(
    stake: Bond,
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

    account.totalBond = isStakeBond(ctx)
        ? (account.totalBond || 0n) + BigInt(data.amount)
        : (account.totalBond || 0n) - BigInt(data.amount)
    account.totalBond = account.totalBond > 0n ? account.totalBond : 0n
    stake.total = account.totalBond

    await ctx.store.save(account)
}

export async function saveRewardEvent(ctx: EventHandlerContext, data: RewardData) {
    const id = ctx.event.id

    const reward = new Reward({ id })

    if (!(await populateStakingItem(reward, { ctx, data }))) return
    await calculateTotalReward(reward, { ctx, data })

    await ctx.store.insert(Reward, reward)
}

export async function saveSlashEvent(ctx: EventHandlerContext, data: RewardData) {
    const id = ctx.event.id

    const slash = new Slash({ id })

    if (!(await populateStakingItem(slash, { ctx, data }))) return
    await calculateTotalSlash(slash, { ctx, data })

    await ctx.store.insert(Slash, slash)
}

export async function saveStakeEvent(ctx: EventHandlerContext, data: StakeData, success = true) {
    //NEED TO FIX
    if (ctx.extrinsic) {
        ctx.event.method = ctx.extrinsic.method === 'unbond' ? 'Unbonded' : 'Bonded'
        ctx.event.name = `staking.${ctx.event.method}`
    }

    const id = ctx.event.id

    const stake = new Bond({ id })

    if (!(await populateStakingItem(stake, { ctx, data }))) return
    stake.success = success

    await calculateTotalStake(stake, { ctx, data })

    await ctx.store.insert(Bond, stake)
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
