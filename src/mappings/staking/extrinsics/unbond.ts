import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { StakeData } from '../../../types/custom/stakingData'
import { StakingUnbondCall } from '../../../types/generated/calls'
import { saveStakeCall } from '../utils/savers'

function getCallData(ctx: ExtrinsicHandlerContext): StakeData {
    const call = new StakingUnbondCall(ctx)

    if (call.isV0) {
        const { value } = call.asV0
        return {
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleUnbond(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await saveStakeCall(ctx, data)
}
