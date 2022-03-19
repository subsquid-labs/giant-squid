import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { saveTransferCall } from '../utils/base'
import { TransferData } from '../../../types/custom/balanceData'
import { BalancesForceTransferCall } from '../../../types/generated/calls'

function getCallData(ctx: ExtrinsicHandlerContext): TransferData | undefined {
    const call = new BalancesForceTransferCall(ctx)
    if (call.isV1020) {
        return undefined
    } else if (call.isV1050) {
        const { source, dest, value } = call.asV1050
        return {
            from: source as Uint8Array,
            to: dest as Uint8Array,
            amount: value,
        }
    } else if (call.isV2028) {
        const { source, dest, value } = call.asV2028
        return {
            from: source.value as Uint8Array,
            to: dest.value as Uint8Array,
            amount: value,
        }
    } else if (call.isV9111) {
        const { source, dest, value } = call.asV9111
        return {
            from: source.value as Uint8Array,
            to: dest.value as Uint8Array,
            amount: value,
        }
    }
    {
        const { source, dest, value } = call.asLatest
        return {
            from: source.value as Uint8Array,
            to: dest.value as Uint8Array,
            amount: value,
        }
    }
}

export async function handleForceTransfer(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveTransferCall(ctx, data)
}
