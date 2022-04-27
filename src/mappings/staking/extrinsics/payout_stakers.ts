import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { encodeID } from '../../../common/helpers'
import { PayoutData } from '../../../types/custom/stakingData'
import config from '../../../config'
import { StakingPayoutStakersCall } from '../../../types/generated/calls'
import { rewardManager } from '../../../managers'

function getCallData(ctx: ExtrinsicHandlerContext): PayoutData {
    const call = new StakingPayoutStakersCall(ctx)

    if (call.isV1058) {
        const { validatorStash, era } = call.asV1058
        return {
            validator: validatorStash,
            era,
        }
    } else {
        const { validatorStash, era } = call.asLatest
        return {
            validator: validatorStash,
            era,
        }
    }
}

export async function savePauoutStakersCall(ctx: ExtrinsicHandlerContext, data: PayoutData) {
    const rewards = await rewardManager.getByExtrinsic(ctx, ctx.extrinsic.hash || '')

    for (const reward of rewards) {
        reward.era = data.era
        reward.validator = encodeID(data.validator, config.chainName)
    }

    await rewardManager.update(ctx, rewards)
}

export async function handlePauoutStakers(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await savePauoutStakersCall(ctx, data)
}
