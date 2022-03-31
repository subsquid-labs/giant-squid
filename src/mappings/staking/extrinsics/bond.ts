import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { StakeData } from '../../../types/custom/stakingData'
import { StakingBondCall } from '../../../types/generated/calls'
import { saveStakeCall } from '../utils/base'

function getCallData(ctx: ExtrinsicHandlerContext): StakeData | undefined {
    const call = new StakingBondCall(ctx)

    if (call.isV13) {
        const { value } = call.asV13
        return {
            amount: value,
        }
    } else if (call.isV29) {
        const { value } = call.asV29
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
