import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { encodeID, isExtrinsicSuccess } from '../../../common/helpers'
import { RewardData, StakeData } from '../../../types/custom/stakingData'
import config from '../../../config'
import { BondType } from '../../../model'
import { bondManager, rewardManager, slashManager } from '../../../managers'
import { getCurrentEra } from '../storage'

export async function saveRewardEvent(ctx: EventHandlerContext, data: RewardData) {
    const accountId = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!accountId) return

    await rewardManager.create(ctx, {
        chain: config.chainName,
        amount: data.amount,
        account: accountId,
    })
}

export async function saveSlashEvent(ctx: EventHandlerContext, data: RewardData) {
    const accountId = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!accountId) return

    await slashManager.create(ctx, {
        chain: config.chainName,
        amount: data.amount,
        account: accountId,
        era: (await getCurrentEra(ctx)) || 0,
    })
}

function getBondType(ctx: EventHandlerContext) {
    return ctx.extrinsic?.method === 'unbond' || ctx.event.method === 'Unbonded' ? BondType.Unbond : BondType.Bond
}

export async function saveStakeEvent(ctx: EventHandlerContext, data: StakeData, success = true) {
    const accountId = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!accountId) return

    await bondManager.create(ctx, {
        chain: config.chainName,
        success,
        amount: data.amount,
        account: accountId,
        type: getBondType(ctx),
    })
}

export async function saveStakeCall(ctx: ExtrinsicHandlerContext, data: StakeData) {
    //in first versions of kusama there aren't event for bonds, so we need to handle them
    const alreadyHandled = ctx.block.events.find(
        (event) =>
            event.extrinsicId === ctx.extrinsic.id &&
            (event.name === 'staking.Bonded' || event.name === 'staking.Unbonded')
    )
    const success = isExtrinsicSuccess(ctx)
    if (alreadyHandled && success) return

    await saveStakeEvent(ctx, data, success)
}
