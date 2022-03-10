import { ExtrinsicHandlerContext, EventHandlerContext, Store } from '@subsquid/substrate-processor'
import { populateMeta, isExtrinsicSuccess, encodeID, getAccount } from '../../../common/helpers'
import { getParachain } from '../../../common/parachain'
import { ContributionData } from '../../../types/custom/crowdloanData'
import config from '../../../config'
import { Crowdloan, Contribution, Contributor } from '../../../model'

async function updateCrowdloanContributions(
    store: Store,
    options: { crowdloan: Crowdloan; contribution: Contribution }
) {
    const { crowdloan, contribution } = options

    crowdloan.contributors = []

    let contributor = crowdloan.contributors.find((contributor) => contributor.id === contribution.account?.id)
    if (!contributor) {
        contributor = new Contributor({
            id: contribution.account?.id as string,
            amount: 0n,
        })
        crowdloan.contributors.push(contributor)
    }

    contributor.amount += BigInt(contribution.amount || 0)
    crowdloan.raised += BigInt(contribution.amount || 0)

    await store.save(crowdloan)
}

export async function saveContributedEvent(ctx: EventHandlerContext, data: ContributionData, success = true) {
    const id = ctx.event.id

    const parachain = await getParachain(ctx.store, `${data.paraId}`)
    if (parachain.crowdloans.length === 0) return

    const crowdloan = await ctx.store.findOne(Crowdloan, parachain.crowdloans[parachain.crowdloans.length - 1].id)
    if (!crowdloan) return

    const contribution = new Contribution({ id })

    populateMeta(ctx, contribution)

    contribution.chainName = config.chainName
    contribution.success = success

    contribution.amount = data.amount

    const contributorId = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    contribution.account = contributorId ? await getAccount(ctx.store, contributorId) : null
    contribution.crowdloan = crowdloan

    await ctx.store.save(contribution)

    if (success) await updateCrowdloanContributions(ctx.store, { crowdloan, contribution })
}

export async function saveContributeCall(ctx: ExtrinsicHandlerContext, data: ContributionData) {
    if (isExtrinsicSuccess(ctx)) return

    await saveContributedEvent(ctx, data, false)
}
