import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { saveTransferCall } from '../utils/base'
import { TransferData } from '../../../types/custom/balanceData'
import { BalancesForceTransferCall } from '../../../types/generated/calls'

function getCallData(ctx: ExtrinsicHandlerContext): TransferData | undefined {
    const call = new BalancesForceTransferCall(ctx)
    if (call.isV13) {
        const { source, dest, value } = call.asV13
        return {
            from: source as Uint8Array,
            to: dest as Uint8Array,
            amount: value,
        }
    } else {
        const { source, dest, value } = call.asLatest
        return {
            from: source as Uint8Array,
            to: dest as Uint8Array,
            amount: value,
        }
    }
}

export async function handleForceTransfer(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveTransferCall(ctx, data)
}
