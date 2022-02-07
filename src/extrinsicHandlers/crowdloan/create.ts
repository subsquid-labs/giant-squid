import { ExtrinsicHandlerContext } from "@subsquid/substrate-processor";
import { getOrCreate } from "../../common/helpers";
import { CreateData } from "../../common/mapping/crowdloanData";
import { getParachain } from "../../common/parachain";
import config from "../../config";
import { Crowdloan } from "../../model";
import * as calls from "../../types/calls"

function getCallData(ctx: ExtrinsicHandlerContext): CreateData {
    let event = new calls.CrowdloanCreateCall(ctx)
    if (event.isV9110) {
        return event.asV9110
    }
    else {
        return event.asLatest
    }
}

export async function parseCreateCall(ctx: ExtrinsicHandlerContext, data: CreateData) {
    const parachain = await getParachain(ctx.store, data.index)

    const crowdloanNum = parachain.crowdloans.length + 1
    const crowdloan = await getOrCreate(ctx.store, Crowdloan, `${data.index}-${crowdloanNum}`)

    crowdloan.cap = data.cap
    crowdloan.end = BigInt(data.end)
    crowdloan.firstPeriod = BigInt(data.firstPeriod)
    crowdloan.lastPeriod = BigInt(data.lastPeriod)
    crowdloan.parachain = parachain
    crowdloan.chainName = config.chainName

    await ctx.store.save(crowdloan)
}

export async function handleCreate(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx);
    await parseCreateCall(ctx, data)
}