import { ExtrinsicHandlerContext, EventHandlerContext } from '@subsquid/substrate-processor'
import { populateMeta, isExtrinsicSuccess, encodeID } from '../../../common/helpers'
import { ContributionData } from '../../../types/custom/crowdloanData'
import config from '../../../config'
import { Crowdloan, Contribution } from '../../../model'
import { accountManager, chainManager, crowdloanManager } from '../../../managers'

async function updateCrowdloanContributions(
    ctx: EventHandlerContext,
    crowdloan: Crowdloan,
    contribution: Contribution
) {
    const contributor = await crowdloanManager.getContributor(ctx, `${crowdloan.id}-${contribution.account.id}`, {
        crowdloan,
        account: contribution.account,
    })

    contributor.amount += BigInt(contribution.amount || 0)
    await ctx.store.save(contributor)

    crowdloan.raised += BigInt(contribution.amount || 0)
    await ctx.store.save(crowdloan)
}

export async function saveContributedEvent(ctx: EventHandlerContext, data: ContributionData, success = true) {
    const id = ctx.event.id

    const contribution = new Contribution({ id })

    populateMeta(ctx, contribution)

    contribution.chain = await chainManager.get(ctx, config.chainName)
    contribution.success = success

    contribution.amount = data.amount

    const contributorId = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!contributorId) return

    contribution.account = await accountManager.get(ctx, contributorId)

    const crowdloan = await crowdloanManager.get(ctx, data.paraId)
    if (!crowdloan) return

    contribution.crowdloan = crowdloan
    if (success) await updateCrowdloanContributions(ctx, crowdloan, contribution)

    await ctx.store.insert(Contribution, contribution)
}

export async function saveContributeCall(ctx: ExtrinsicHandlerContext, data: ContributionData) {
    if (isExtrinsicSuccess(ctx)) return

    await saveContributedEvent(ctx, data, false)
}
