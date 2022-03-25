import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { TransferData } from '../../../types/custom/balanceData'
import { BalancesTransferKeepAliveCall } from '../../../types/generated/calls'
import { saveTransferCall } from '../utils/base'

function getCallData(ctx: ExtrinsicHandlerContext): TransferData | undefined {
    const call = new BalancesTransferKeepAliveCall(ctx)
    if (call.isV49) {
        const { dest, value } = call.asV49
        return {
            to: dest as Uint8Array,
            amount: value,
        }
    } else {
        const { dest, value } = call.asLatest
        return {
            to: dest as Uint8Array,
            amount: value,
        }
    }
}

export async function handleTransferKeepAlive(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveTransferCall(ctx, data)
}
