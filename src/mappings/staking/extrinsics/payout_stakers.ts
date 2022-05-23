import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { encodeId } from '../../../common/helpers'
import { PayoutData } from '../../../types/custom/stakingData'
import config from '../../../config'
import { StakingPayoutStakersCall } from '../../../types/generated/calls'
import { rewardManager } from '../../../managers'
import { UnknownVersionError } from '../../../common/errors'

function getCallData(ctx: ExtrinsicHandlerContext): PayoutData {
    const call = new StakingPayoutStakersCall(ctx)

    if (call.isV1058) {
        const { validatorStash, era } = call.asV1058
        return {
            validator: validatorStash,
            era,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function savePauoutStakersCall(ctx: ExtrinsicHandlerContext, data: PayoutData) {
    const rewards = await rewardManager.getByExtrinsic(ctx, ctx.extrinsic.hash || '')

    for (const reward of rewards) {
        reward.era = data.era
        reward.validator = encodeId(data.validator, config.chainName)
    }

    await rewardManager.update(ctx, rewards)
}

export async function handlePauoutStakers(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await savePauoutStakersCall(ctx, data)
}
