import { UnknownVersionError } from '../../../common/errors'
import { encodeId, getOriginAccountId } from '../../../common/tools'
import { BalancesTransferCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { saveTransfer } from './utils'

interface EventData {
    to: Uint8Array
    amount: bigint
}

function getCallData(ctx: CallContext): EventData | undefined {
    const call = new BalancesTransferCall(ctx)
    if (call.isV49) {
        const { dest, value } = call.asV49
        return {
            to: dest as Uint8Array,
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleTransfer(ctx: CallHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveTransfer(ctx, {
        id: ctx.call.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.extrinsic.hash,
        fromId: getOriginAccountId(ctx.call.origin),
        toId: encodeId(data.to),
        amount: data.amount,
        success: ctx.call.success,
    })
}
