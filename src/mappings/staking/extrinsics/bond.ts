import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { StakeData } from '../../../types/custom/stakingData'
import { StakingBondCall } from '../../../types/generated/calls'
import { saveStakeCall } from '../base/savers'

function getCallData(ctx: ExtrinsicHandlerContext): StakeData | undefined {
    const call = new StakingBondCall(ctx)

    if (call.isV1020) {
        return undefined
    } else if (call.isV1050) {
        const { value } = call.asV1050
        return {
            amount: value,
        }
    } else if (call.isV2028) {
        const { value } = call.asV2028
        return {
            amount: value,
        }
    } else if (call.isV9111) {
        const { value } = call.asV9111
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

export async function handleBond(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveStakeCall(ctx, data)
}
