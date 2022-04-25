import { ExtrinsicHandlerContext, EventHandlerContext } from '@subsquid/substrate-processor'
import { isExtrinsicSuccess, encodeID } from '../../../common/helpers'
import { ContributionData } from '../../../types/custom/crowdloanData'
import config from '../../../config'
import { contributionManager } from '../../../managers'

export async function saveContributedEvent(ctx: EventHandlerContext, data: ContributionData, success = true) {
    const contributorId = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!contributorId) return

    await contributionManager.create(ctx, {
        chain: config.chainName,
        account: contributorId,
        success,
        amount: data.amount,
        paraId: data.paraId,
    })
}

export async function saveContributeCall(ctx: ExtrinsicHandlerContext, data: ContributionData) {
    if (isExtrinsicSuccess(ctx)) return

    await saveContributedEvent(ctx, data, false)
}
