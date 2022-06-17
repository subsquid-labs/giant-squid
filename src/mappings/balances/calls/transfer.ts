import { UnknownVersionError } from '../../../common/errors'
import { encodeId, getOriginAccountId, isAdressSS58 } from '../../../common/tools'
import { BalancesTransferCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { saveTransfer } from './utils'

interface EventData {
    to: Uint8Array
    amount: bigint
}

function getCallData(ctx: CallContext): EventData | undefined {
    const call = new BalancesTransferCall(ctx)

    if (call.isV13) {
        const { dest, value } = call.asV13
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
        toId: isAdressSS58(data.to) ? encodeId(data.to) : null,
        amount: data.amount,
        success: ctx.call.success,
    })
}
