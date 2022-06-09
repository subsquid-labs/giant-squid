import { BalancesForceTransferCall } from '../../../types/generated/calls'
import { encodeId, isAdressSS58 } from '../../../common/helpers'
import { saveTransfer } from './utils'
import { UnknownVersionError } from '../../../common/errors'
import { CallContext, CallHandlerContext } from '../../types/contexts'

interface EventData {
    from: Uint8Array
    to: Uint8Array
    amount: bigint
}

function getCallData(ctx: CallContext): EventData | undefined {
    const call = new BalancesForceTransferCall(ctx)

    if (call.isV0) {
        const { source, dest, value } = call.asV0
        return {
            from: source as Uint8Array,
            to: dest as Uint8Array,
            amount: value,
        }
    } else if (call.isV28) {
        const { source, dest, value } = call.asV28
        return {
            from: source.value as Uint8Array,
            to: dest.value as Uint8Array,
            amount: value,
        }
    } else if (call.isV9110) {
        const { source, dest, value } = call.asV9110
        return {
            from: source.value as Uint8Array,
            to: dest.value as Uint8Array,
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleForceTransfer(ctx: CallHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveTransfer(ctx, {
        id: ctx.call.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.extrinsic.hash,
        fromId: encodeId(data.from),
        toId: isAdressSS58(data.to) ? encodeId(data.to) : null,
        amount: data.amount,
        success: ctx.call.success,
    })
}
