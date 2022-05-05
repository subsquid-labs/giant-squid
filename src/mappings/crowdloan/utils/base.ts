import { ExtrinsicHandlerContext, EventHandlerContext } from '@subsquid/substrate-processor'
import { isExtrinsicSuccess, encodeId } from '../../../common/helpers'
import { ContributionData } from '../../../types/custom/crowdloanData'
import config from '../../../config'
import { contributionManager, contributorManager, crowdloanManager } from '../../../managers'

export async function saveContributedEvent(ctx: EventHandlerContext, data: ContributionData, success = true) {
    const contributorId = data.account ? encodeId(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!contributorId) return

    const contribution = await contributionManager.create(ctx, {
        chain: config.chainName,
        account: contributorId,
        success,
        amount: data.amount,
        paraId: data.paraId,
    })

    if (success) {
        const account = contribution.account

        const crowdloan = contribution.crowdloan
        if (!crowdloan) return

        let contributor = await contributorManager.get(ctx, `${crowdloan.id}-${account.id}`)
        if (!contributor) {
            contributor = await contributorManager.create(ctx, {
                account: contribution.account.id,
                crowdloan: crowdloan.id,
            })
        }

        contributor.amount += BigInt(contribution.amount || 0)
        await contributorManager.update(ctx, contributor)

        crowdloan.raised += BigInt(contribution.amount || 0)
        await crowdloanManager.update(ctx, crowdloan)
    }
}

export async function saveContributeCall(ctx: ExtrinsicHandlerContext, data: ContributionData) {
    if (isExtrinsicSuccess(ctx)) return

    await saveContributedEvent(ctx, data, false)
}
