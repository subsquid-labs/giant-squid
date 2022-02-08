
import { ExtrinsicHandlerContext } from "@subsquid/substrate-processor";
import { getOrCreate, isExtrinsicSuccess } from "../../../common/helpers";
import { ContributionData } from "../../../common/types/crowdloanData";
import config from "../../../config";
import { Contribution, Crowdloan, Parachain } from "../../../model";
import { CrowdloanContributeCall } from "../../../types/calls";

function getCallData(ctx: ExtrinsicHandlerContext): ContributionData {
    const call = new CrowdloanContributeCall(ctx)
    if (call.isV9110) {
        const { index, value } = call.asV9110
        return {
            paraId: index,
            amount: value
        }
    }
    else {
        const { index, value } = call.asLatest
        return {
            paraId: index,
            amount: value
        }
    }
}

export async function saveContributeCall(ctx: ExtrinsicHandlerContext, data: ContributionData) {
    const id = `${ctx.extrinsic.id}`

    const contribution = await getOrCreate(ctx.store, Contribution, id)

    contribution.extrinisicHash = contribution.extrinisicHash || ctx.extrinsic.hash
    contribution.blockNumber = contribution.blockNumber || BigInt(ctx.block.height)
    contribution.success = contribution.success || isExtrinsicSuccess(ctx)
    contribution.date = contribution.date || new Date(ctx.event.blockTimestamp)
    contribution.chainName = config.chainName

    const parachain = await ctx.store.findOne(Parachain, `${data.paraId}`)
    const crowdloanNum = parachain?.crowdloans.length || 0
    contribution.crowdloan = await ctx.store.findOne(Crowdloan, `${data.paraId}-${crowdloanNum}`)

    contribution.account = ctx.extrinsic.signer
    contribution.amount = data.amount || 0n

    ctx.store.save(contribution)
}

export async function handleContribute(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx);
    await saveContributeCall(ctx, data)
}