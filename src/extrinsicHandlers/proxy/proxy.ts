import { ExtrinsicHandlerContext } from "@subsquid/substrate-processor";
import { ProxyProxyCall } from "../../types/calls"
import { saveTransferCall } from "../balances/transferBase";
import { saveCreateCall } from "../crowdloan/create";

function getProxyCall(ctx: ExtrinsicHandlerContext) {
    let event = new ProxyProxyCall(ctx)
    if (event.isV9110) {
        return event.asV9110.call
    }
    else if (event.isV9140) {
        return event.asV9140.call
    }
    else
        return event.asLatest.call
}

export async function handleProxy(ctx: ExtrinsicHandlerContext) {
    const call = getProxyCall(ctx);

    switch (call.__kind) {
        case 'Crowdloan':
            switch (call.value.__kind) {
                case 'create':
                    saveCreateCall(ctx, call.value)
                    break
            }
            break;
        case 'Balances':
            switch (call.value.__kind) {
                case 'transfer':
                case 'transfer_keep_alive':
                    saveTransferCall(ctx, {
                        to: call.value.dest.value as Uint8Array,
                        amount: call.value.value
                    })
                    break
                case 'force_transfer':
                    saveTransferCall(ctx, {
                        to: call.value.dest.value as Uint8Array,
                        from: call.value.source.value as Uint8Array,
                        amount: call.value.value
                    })
                    break
                case 'transfer_all':
                    saveTransferCall(ctx, {
                        to: call.value.dest.value as Uint8Array,
                    })
                    break
            }
    }
}