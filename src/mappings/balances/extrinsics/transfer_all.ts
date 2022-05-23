import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { saveTransfer } from '../utils/saver'
import { BalancesTransferAllCall } from '../../../types/generated/calls'
import { encodeId } from '../../../common/helpers'

interface EventData {
    to: Uint8Array
}

function getCallData(ctx: ExtrinsicHandlerContext): EventData {
    const call = new BalancesTransferAllCall(ctx)
    if (call.isV9050) {
        const { dest } = call.asV9050
        return {
            to: dest.value as Uint8Array,
        }
    } else if (call.isV9111) {
        const { dest } = call.asV9111
        return {
            to: dest.value as Uint8Array,
        }
    } else {
        const { dest } = call.asLatest
        return {
            to: dest.value as Uint8Array,
        }
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
