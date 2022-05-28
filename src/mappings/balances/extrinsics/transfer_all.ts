import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { BalancesTransferAllCall } from '../../../types/generated/calls'
import { UnknownVersionError } from '../../../common/errors'
import { saveTransfer } from '../utils/saver'
import { encodeId } from '../../../common/helpers'

interface CallData {
    to: Uint8Array
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData {
    const call = new BalancesTransferAllCall(ctx)
    if (call.isV900) {
        const { dest } = call.asV900
        return {
            to: dest as Uint8Array,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleTransferAll(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await saveTransfer(ctx, {
        from: ctx.extrinsic.signer,
        to: encodeId(data.to),
        amount: 0n,
    })
}
