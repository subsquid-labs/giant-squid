import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { StakingValidateCall } from '../../../types/generated/calls'
import { saveValidateCall } from '../utils/savers'

interface CallData {
    commission: number
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData | undefined {
    const call = new StakingValidateCall(ctx)

    if (call.isV1020) {
        const { prefs } = call.asV1020
        return {
            commission: prefs.commission,
        }
    } else if (call.isV2028) {
        const { prefs } = call.asV2028
        return {
            commission: prefs.commission,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleValidate(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveValidateCall(ctx, data)
}
