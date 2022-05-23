import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { StakeData } from '../../../types/custom/stakingData'
import { StakingBondExtraCall } from '../../../types/generated/calls'
import { saveStakeCall } from '../utils/savers'

function getCallData(ctx: ExtrinsicHandlerContext): StakeData {
    const call = new StakingBondExtraCall(ctx)

    if (call.isV1020) {
        const { maxAdditional } = call.asV1020
        return {
            amount: maxAdditional,
        }
    } else {
        const { maxAdditional } = call.asLatest
        return {
            amount: maxAdditional,
        }
    }
}

export async function handleBondExtra(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await saveStakeCall(ctx, data)
}
