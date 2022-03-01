import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { saveTransferCall } from '../utils/base'
import { TransferData } from '../../../common/types/balanceData'
import { BalancesTransferAllCall } from '../../../types/calls'

function getCallData(ctx: ExtrinsicHandlerContext): TransferData {
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

    await saveTransferCall(ctx, data)
}
