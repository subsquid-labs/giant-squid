import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { StakeData } from '../../../types/custom/stakingData'
import { StakingBondCall } from '../../../types/generated/calls'
import { saveStakeCall } from '../utils/savers'

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
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleBond(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveStakeCall(ctx, data)
}
