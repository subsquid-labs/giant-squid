import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import { BalancesTransferKeepAliveCall } from '../../../types/generated/calls'
import { saveTransfer } from '../utils/saver'

interface CallData {
    to: Uint8Array
    amount: bigint
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData {
    const call = new BalancesTransferKeepAliveCall(ctx)
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

export async function handleTransferKeepAlive(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await saveTransfer(ctx, {
        from: ctx.extrinsic.signer,
        to: encodeId(data.to),
        amount: data.amount,
    })
}
