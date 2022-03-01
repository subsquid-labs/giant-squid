import { ExtrinsicHandlerContext, EventHandlerContext, Store } from '@subsquid/substrate-processor'
import { getOrCreate, populateMeta, isExtrinsicSuccess, encodeID, getAccount } from '../../common/helpers'
import { getOrCreateParachain } from '../../common/parachain'
import { ContributionData } from '../../common/types/crowdloanData'
import config from '../../config'
import { Crowdloan, Contribution, Contributor } from '../../model'

async function updateCrowdloanContributions(
    store: Store,
    options: { crowdloan: Crowdloan; contribution: Contribution }
) {
    const { crowdloan, contribution } = options

    crowdloan.contributors ??= []

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

    const parachain = await getOrCreateParachain(ctx.store, `${data.paraId}`)
    const crowdloanNum = parachain?.crowdloans.length || 0
    const crowdloan = await ctx.store.findOne(Crowdloan, `${data.paraId}-${crowdloanNum}`)
    if (!crowdloan) return

    const contribution = await getOrCreate(ctx.store, Contribution, id)

    populateMeta(ctx, contribution)

    contribution.chainName ??= config.chainName
    contribution.success ??= success

    contribution.amount ??= data.amount

    const contributorId = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    contribution.account ??= contributorId ? await getAccount(ctx.store, contributorId) : null
    contribution.crowdloan ??= crowdloan

    await ctx.store.save(contribution)

    if (success) await updateCrowdloanContributions(ctx.store, { crowdloan, contribution })
}

export async function saveContributeCall(ctx: ExtrinsicHandlerContext, data: ContributionData) {
    if (isExtrinsicSuccess(ctx)) return

    saveContributedEvent(ctx, data, false)
}
