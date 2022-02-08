import { ExtrinsicHandlerContext } from "@subsquid/substrate-processor";
import { CreateData } from "../../../common/types/crowdloanData";
import { ProxyProxyCall } from "../../../types/calls"
import { saveTransferCall } from "../balances/transferBase";
import { saveCreateCall } from "../crowdloan/create";

const CROWDLOAN_CREATE = '0x4900'

/**
 * Temporary solution. Will be removed with new archive.
 * Now it handles only 'crowdloan.create' calls.
 */
function getCallData(ctx: ExtrinsicHandlerContext): CreateData | undefined {
    let { callIndex, args } = ctx.extrinsic.args[2].value as {
        callIndex: string,
        args: {
            index: number
            cap: string,
            end: number,
            first_period: number,
            last_period: number,
        }
    }

    if (callIndex != CROWDLOAN_CREATE)
        return undefined

    return {
        index: args.index,
        cap: BigInt(args.cap),
        firstPeriod: args.first_period,
        lastPeriod: args.last_period,
        end: args.end
    }
}

/**
* Due to bug or error some extrinsics with 'crowdloan.create' call
* don't have 'crowdloan.Created' event, but have 'system.ExtrinsicSuccess',
* so it needs to be handled 
 */
function isCrowdloanCreateValid(ctx: ExtrinsicHandlerContext): boolean {
    const extrinsicEvents = ctx.block.events.filter((event) => event.extrinsicId == ctx.extrinsic.id)

    return extrinsicEvents.find((event) => event.name == 'crowdloan.Created') != undefined
}

export async function handleProxy(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx);

    if (!data)
        return

    if (isCrowdloanCreateValid(ctx))
        await saveCreateCall(ctx, data)

    // switch (call.__kind) {
    //     case 'Crowdloan':
    //         switch (call.value.__kind) {
    //             case 'create':
    //                 if (isCrowdloanCreateValid(ctx))
    //                     await saveCreateCall(ctx, call.value)
    //                 break
    //         }
    //         break;
    //     case 'Balances':
    //         switch (call.value.__kind) {
    //             case 'transfer':
    //             case 'transfer_keep_alive':
    //                 await saveTransferCall(ctx, {
    //                     to: call.value.dest.value as Uint8Array,
    //                     amount: call.value.value
    //                 })
    //                 break
    //             case 'force_transfer':
    //                 await saveTransferCall(ctx, {
    //                     to: call.value.dest.value as Uint8Array,
    //                     from: call.value.source.value as Uint8Array,
    //                     amount: call.value.value
    //                 })
    //                 break
    //             case 'transfer_all':
    //                 await saveTransferCall(ctx, {
    //                     to: call.value.dest.value as Uint8Array,
    //                 })
    //                 break
    //         }
    // }
}