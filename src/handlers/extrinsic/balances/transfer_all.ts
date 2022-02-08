import { ExtrinsicHandlerContext } from "@subsquid/substrate-processor";
import { TransferData } from "../../../common/types/balanceData";
import {
    BalancesTransferAllCall
} from "../../../types/calls"
import { saveTransferCall } from "./transferBase";

function getCallData(ctx: ExtrinsicHandlerContext): TransferData {
    const call = new BalancesTransferAllCall(ctx)
    if (call.isV9050) {
        let { dest } = call.asV9050
        return {
            to: dest.value as Uint8Array,
        }
    } else if (call.isV9110) {
        let { dest } = call.asV9110
        return {
            to: dest.value as Uint8Array,
        }
    } else {
        let { dest } = call.asLatest
        return {
            to: dest.value as Uint8Array,
        }
    }
}

export async function handleTransferAll(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await saveTransferCall(ctx, data)
}