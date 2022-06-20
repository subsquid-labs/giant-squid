import { encodeId } from '../../../common/tools'
import { StakingPayoutStakersCall } from '../../../types/generated/calls'
import { UnknownVersionError } from '../../../common/errors'
import { EraValidator, Reward } from '../../../model'
import { CallContext, CallHandlerContext } from '../../types/contexts'

export interface CallData {
    era: number
    validator: Uint8Array
}

function getCallData(ctx: CallContext): CallData {
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

export async function handlePauoutStakers(ctx: CallHandlerContext) {
    if (!ctx.call.success) return

    const data = getCallData(ctx)

    const rewards = await ctx.store.find(Reward, { callId: ctx.call.id })

    for (const reward of rewards) {
        reward.era = data.era
        reward.validator = encodeId(data.validator)
    }

    await ctx.store.save(rewards)
}
