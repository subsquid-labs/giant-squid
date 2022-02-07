import { ExtrinsicHandlerContext } from "@subsquid/substrate-processor";
import { TransferData } from "../../common/mapping/balanceData";
import {
    BalancesTransferAllCall
} from "../../types/calls"
import { parseTransferCall } from "./transferBase";
import { snakeCase } from "snake-case";

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
    ctx.extrinsic.method = snakeCase(ctx.extrinsic.method);
    ctx.extrinsic.name = `${ctx.extrinsic.section}.${ctx.extrinsic.method}`;
    const data = getCallData(ctx)

    await parseTransferCall(ctx, data)
}