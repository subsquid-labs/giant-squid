
import { ExtrinsicHandlerContext } from "@subsquid/substrate-processor";
import { getOrCreate, isExtrinsicSuccess } from "../../../common/helpers";
import { getParachain } from "../../../common/parachain";
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

    const parachain = await getParachain(ctx.store, `${data.paraId}`)
    const crowdloanNum = parachain?.crowdloans.length || 0
    const crowdloan = await ctx.store.findOne(Crowdloan, `${data.paraId}-${crowdloanNum}`)
    if (!crowdloan)
        return

    const contribution = await getOrCreate(ctx.store, Contribution, id)

    contribution.extrinisicHash ??= ctx.extrinsic.hash
    contribution.blockNumber ??= BigInt(ctx.block.height)
    contribution.success ??= isExtrinsicSuccess(ctx)
    contribution.date ??= new Date(ctx.event.blockTimestamp)
    contribution.chainName ??= config.chainName

    contribution.crowdloan ??= crowdloan
    contribution.account ??= ctx.extrinsic.signer
    contribution.amount ??= data.amount || 0n
    
    ctx.store.save(contribution)

    if (!crowdloan.contributors?.includes(contribution.account))
        crowdloan.contributors?.push(contribution.account)
    crowdloan.raised += BigInt(contribution.amount)

    ctx.store.save(crowdloan)
}

export async function handleContribute(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx);
    await saveContributeCall(ctx, data)
}