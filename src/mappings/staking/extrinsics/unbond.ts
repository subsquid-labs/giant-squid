import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { StakeData } from '../../../types/custom/stakingData'
import { StakingUnbondCall } from '../../../types/generated/calls'
import { saveStakeCall } from '../utils/base'

function getCallData(ctx: ExtrinsicHandlerContext): StakeData {
    const call = new StakingUnbondCall(ctx)

    if (call.isV1020) {
        const { value } = call.asV1020
        return {
            amount: value,
        }
    } else {
        const { value } = call.asLatest
        return {
            amount: value,
        }
    }
}

export async function handleUnbond(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await saveStakeCall(ctx, data)
}
