import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { TransferData } from '../../../common/types/balanceData'
import { BalancesTransferKeepAliveCall } from '../../../types/calls'
import { saveTransferCall } from './transferBase'

function getCallData(ctx: ExtrinsicHandlerContext): TransferData {
    const call = new BalancesTransferKeepAliveCall(ctx)
    if (call.isV0) {
        let { dest, value } = call.asV0
        return {
            to: dest,
            amount: value,
        }
    } else if (call.isV28) {
        let { dest, value } = call.asV28
        return {
            to: dest.value as Uint8Array,
            amount: value,
        }
    } else if (call.isV9110) {
        let { dest, value } = call.asV9110
        return {
            to: dest.value as Uint8Array,
            amount: value,
        }
    } else {
        let { dest, value } = call.asLatest
        return {
            to: dest.value as Uint8Array,
            amount: value,
        }
    }
}

export async function handleTransferKeepAlive(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await saveTransferCall(ctx, data)
}
