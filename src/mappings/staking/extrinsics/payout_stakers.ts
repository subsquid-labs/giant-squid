import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { encodeId } from '../../../common/helpers'
import { StakingPayoutStakersCall } from '../../../types/generated/calls'
import { UnknownVersionError } from '../../../common/errors'
import { Reward } from '../../../model'

export interface CallData {
    era: number
    validator: Uint8Array
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData {
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

export async function handlePauoutStakers(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    const rewards = await ctx.store.find(Reward, { extrinsicHash: ctx.extrinsic.hash })

    for (const reward of rewards) {
        reward.era = data.era
        reward.validator = encodeId(data.validator)
    }

    await ctx.store.save(rewards)
}
