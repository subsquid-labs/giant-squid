import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { getOrCreate, isExtrinsicSuccess, populateMeta } from '../../../common/helpers'
import { getOrCreateParachain } from '../../../common/parachain'
import { ContributionData } from '../../../common/types/crowdloanData'
import config from '../../../config'
import { Contribution, Crowdloan } from '../../../model'
import { CrowdloanContributeCall } from '../../../types/calls'

function getCallData(ctx: ExtrinsicHandlerContext): ContributionData {
    const call = new CrowdloanContributeCall(ctx)
    if (call.isV9010) {
        const { index, value } = call.asV9010
        return {
            paraId: index,
            amount: value,
        }
    } else {
        const { index, value } = call.asLatest
        return {
            paraId: index,
            amount: value,
        }
    }
}

export async function saveContributeCall(ctx: ExtrinsicHandlerContext, data: ContributionData) {
    const extrinsicId = ctx.extrinsic.id

    const parachain = await getOrCreateParachain(ctx.store, `${data.paraId}`)
    const crowdloanNum = parachain?.crowdloans.length || 0
    const crowdloan = await ctx.store.findOne(Crowdloan, `${data.paraId}-${crowdloanNum}`)
    if (!crowdloan) return

    const contribution = await getOrCreate(ctx.store, Contribution, {
        extrinsicId
    })

    populateMeta(ctx, contribution)

    contribution.chainName ??= config.chainName
    contribution.success ??= isExtrinsicSuccess(ctx)

    contribution.crowdloan ??= crowdloan
    contribution.account ??= ctx.extrinsic.signer
    contribution.amount ??= data.amount

    ctx.store.save(contribution)
}

export async function handleContribute(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    await saveContributeCall(ctx, data)
}
