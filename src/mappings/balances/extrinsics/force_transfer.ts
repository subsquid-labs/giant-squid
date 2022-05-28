import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { BalancesForceTransferCall } from '../../../types/generated/calls'
import { UnknownVersionError } from '../../../common/errors'
import { saveTransfer } from '../utils/saver'
import { encodeId } from '../../../common/helpers'

interface CallData {
    from: Uint8Array
    to: Uint8Array
    amount: bigint
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData {
    const call = new BalancesForceTransferCall(ctx)
    if (call.isV49) {
        const { source, dest, value } = call.asV49
        return {
            from: source as Uint8Array,
            to: dest as Uint8Array,
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleForceTransfer(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await saveTransfer(ctx, {
        from: encodeId(data.from),
        to: encodeId(data.to),
        amount: data.amount,
    })
}
