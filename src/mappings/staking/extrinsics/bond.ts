import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { StakeData } from '../../../types/custom/stakingData'
import { StakingBondCall } from '../../../types/generated/calls'
import { saveStakeCall } from '../utils/savers'

function getCallData(ctx: ExtrinsicHandlerContext): StakeData | undefined {
    const call = new StakingBondCall(ctx)

    if (call.isV0) {
        return {
            amount: call.asV0.value,
        }
    } else if (call.isV28) {
        const { value } = call.asV28
        return {
            amount: value,
        }
    } else if (call.isV9110) {
        const { value } = call.asV9110
        return {
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleBond(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveStakeCall(ctx, data)
}
