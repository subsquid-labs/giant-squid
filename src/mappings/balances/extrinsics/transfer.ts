import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { TransferData } from '../../../types/custom/balanceData'
import { BalancesTransferCall } from '../../../types/generated/calls'
import { saveTransferCall } from '../utils/base'

function getCallData(ctx: ExtrinsicHandlerContext): TransferData | undefined {
    const call = new BalancesTransferCall(ctx)
    if (call.isV1) {
        const { dest, value } = call.asV1
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
