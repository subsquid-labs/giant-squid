import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { TransferData } from '../../../common/types/balanceData'
import { BalancesTransferCall } from '../../../types/calls'
import { saveTransferCall } from '../base'

function getCallData(ctx: ExtrinsicHandlerContext): TransferData | undefined {
    const call = new BalancesTransferCall(ctx)
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

export async function handleTransfer(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveTransferCall(ctx, data)
}
