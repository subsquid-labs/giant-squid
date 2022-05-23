import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { StakingValidateCall } from '../../../types/generated/calls'
import { saveValidateCall } from '../utils/savers'

interface CallData {
    commission: number
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData | undefined {
    const call = new StakingValidateCall(ctx)

    if (call.isV0) {
        const { prefs } = call.asV0
        return {
            commission: prefs.commission,
        }
    } else if (call.isV28) {
        const { prefs } = call.asV28
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
