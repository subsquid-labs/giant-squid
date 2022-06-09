import { saveTransfer } from './utils'
import { BalancesTransferAllCall } from '../../../types/generated/calls'
import { encodeId, getOriginAccountId, isAdressSS58 } from '../../../common/helpers'
import { UnknownVersionError } from '../../../common/errors'
import { CallContext, CallHandlerContext } from '../../types/contexts'

interface EventData {
    to: Uint8Array
}

function getCallData(ctx: CallContext): EventData {
    const call = new BalancesTransferAllCall(ctx)

    if (call.isV9050) {
        const { dest } = call.asV9050
        return {
            to: dest.value as Uint8Array,
        }
    } else if (call.isV9110) {
        const { dest } = call.asV9110
        return {
            to: dest.value as Uint8Array,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleTransferAll(ctx: CallHandlerContext) {
    const data = getCallData(ctx)

    await saveTransfer(ctx, {
        id: ctx.call.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.extrinsic.hash,
        fromId: getOriginAccountId(ctx.call.origin),
        toId: isAdressSS58(data.to) ? encodeId(data.to) : null,
        amount: 0n,
        success: ctx.call.success,
    })
}
