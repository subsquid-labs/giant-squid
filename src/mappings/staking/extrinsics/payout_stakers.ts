import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { encodeID, populateMeta } from '../../../common/helpers'
import { PayoutData } from '../../../types/custom/stakingData'
import config from '../../../config'
import { Reward } from '../../../model'
import { StakingPayoutStakersCall } from '../../../types/generated/calls'
import { UnknownVersionError } from '../../../common/errors'

function getCallData(ctx: ExtrinsicHandlerContext): PayoutData {
    const call = new StakingPayoutStakersCall(ctx)

    if (call.isV13) {
        const { validatorStash, era } = call.asV13
        return {
            validator: validatorStash,
            era,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function savePauoutStakersCall(ctx: ExtrinsicHandlerContext, data: PayoutData) {
    const rewards = await ctx.store.find(Reward, {
        where: [
            {
                extrinsicHash: ctx.extrinsic.hash,
            },
        ],
    })

    for (const reward of rewards) {
        populateMeta(ctx, reward)

        reward.era ??= data.era
        reward.validator ??= encodeID(data.validator, config.chainName)
    }

    await ctx.store.save(rewards)
}

export async function handlePauoutStakers(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await savePauoutStakersCall(ctx, data)
}
