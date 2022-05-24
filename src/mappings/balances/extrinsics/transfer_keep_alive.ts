import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { encodeId } from '../../../common/helpers'
import { BalancesTransferKeepAliveCall } from '../../../types/generated/calls'
import { saveTransfer } from '../utils/saver'

interface EventData {
    to: Uint8Array
    amount: bigint
}

function getCallData(ctx: ExtrinsicHandlerContext): EventData | undefined {
    const call = new BalancesTransferKeepAliveCall(ctx)
    if (call.isV1020) {
        return undefined
    } else if (call.isV1050) {
        const { dest, value } = call.asV1050
        return {
            to: dest as Uint8Array,
            amount: value,
        }
    } else if (call.isV2028) {
        const { dest, value } = call.asV2028
        return {
            to: dest.value as Uint8Array,
            amount: value,
        }
    } else if (call.isV9111) {
        const { dest, value } = call.asV9111
        return {
            to: dest.value as Uint8Array,
            amount: value,
        }
    } else {
        const { dest, value } = call.asLatest
        return {
            to: dest.value as Uint8Array,
            amount: value,
        }
    }
}

export async function handleTransferKeepAlive(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveTransfer(ctx, {
        from: ctx.extrinsic.signer,
        to: encodeId(data.to),
        amount: data.amount,
    })
}
