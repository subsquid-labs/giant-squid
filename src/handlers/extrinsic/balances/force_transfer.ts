import { ExtrinsicHandlerContext } from "@subsquid/substrate-processor";
import { TransferData } from "../../../common/types/balanceData";
import {
    BalancesForceTransferCall
} from "../../../types/calls"
import { saveTransferCall } from "./transferBase";

function getCallData(ctx: ExtrinsicHandlerContext): TransferData {
    const call = new BalancesForceTransferCall(ctx)
    if (call.isV0) {
        let { source, dest, value } = call.asV0
        return {
            from: source,
            to: dest,
            amount: value
        }
    } else if (call.isV28) {
        let { source, dest, value } = call.asV28
        return {
            from: source.value as Uint8Array,
            to: dest.value as Uint8Array,
            amount: value
        }
    } else if (call.isV9110) {
        let { source, dest, value } = call.asV9110
        return {
            from: source.value as Uint8Array,
            to: dest.value as Uint8Array,
            amount: value
        }
    } else {
        let { source, dest, value } = call.asLatest
        return {
            from: source.value as Uint8Array,
            to: dest.value as Uint8Array,
            amount: value
        }
    }
}

export async function handleForceTransfer(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await saveTransferCall(ctx, data)
}