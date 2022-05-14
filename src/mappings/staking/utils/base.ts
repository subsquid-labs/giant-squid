import { EventHandlerContext, toHex } from '@subsquid/substrate-processor'
import { populateMeta, saturatingSumBigInt } from '../../../common/helpers'
import { RewardData, StakeData } from '../../../types/custom/stakingData'
import config from '../../../config'
import { Bond, Reward } from '../../../model'
import { accountManager, chainManager, roundManager } from '../../../managers'
import { AddressNotDecoded } from '../../../common/errors'
import { getAddress } from '@ethersproject/address'

async function populateStakingItem(
    item: Reward | Bond,
    options: {
        ctx: EventHandlerContext
        data: RewardData | StakeData
    }
): Promise<Reward | Bond | undefined> {
    const { ctx, data } = options

    populateMeta(ctx, item)

    item.chain = await chainManager.get(ctx, config.chainName)

    const id = data.account ? getAddress(toHex(data.account)) : ctx.extrinsic?.signer
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

export async function saveRewardedEvent(ctx: EventHandlerContext, data: RewardData): Promise<void> {
    const { id } = ctx.event

    const reward = new Reward({ id })

    if (!(await populateStakingItem(reward, { ctx, data }))) return
    await calculateTotalReward(reward, { ctx, data })

    reward.round = await roundManager.getRoundNumberForRewards(ctx)

    await ctx.store.insert(Reward, reward)
}

export async function saveBondEvent(ctx: EventHandlerContext, data: StakeData): Promise<void> {
    const accountId = getAddress(toHex(data.account))
    const account = await accountManager.get(ctx, accountId)

    const candidate = data.candidate ? await accountManager.get(ctx, getAddress(toHex(data.candidate))) : null

    account.totalBond = data.newTotal ? data.newTotal : saturatingSumBigInt(account.totalBond, data.amount)

    const bond = new Bond({
        id: ctx.event.id,
        account,
        candidate,
        amount: data.amount,
        total: account.totalBond,
        type: data.type,
        chain: account.chain,
        extrinsicHash: ctx.extrinsic?.hash,
        blockNumber: BigInt(ctx.block.height),
        date: new Date(ctx.block.timestamp),
        success: true,
    })

    await ctx.store.save([bond, account])
}
