import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { saveTransfer } from '../utils/save'
import { BalancesForceTransferCall } from '../../../types/generated/calls'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId, isAdressSS58 } from '../../../common/helpers'

interface EventData {
    from: Uint8Array
    to: Uint8Array
    amount: bigint
}

function getCallData(ctx: ExtrinsicHandlerContext): EventData {
    const call = new BalancesForceTransferCall(ctx)
    if (call.isV2000) {
        const { source, dest, value } = call.asV2000
        return {
            from: source.value as Uint8Array,
            to: dest.value as Uint8Array,
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleForceTransfer(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await saveTransfer(ctx, {
        from: isAdressSS58(data.to) ? encodeId(data.from) : null,
        to: isAdressSS58(data.to) ? encodeId(data.to) : null,
        amount: data.amount,
    })
}
