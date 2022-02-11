import { EventHandlerContext, Store } from '@subsquid/substrate-processor'
import { encodeID, getOrCreate, populateMeta } from '../../../common/helpers'
import { getOrCreateParachain } from '../../../common/parachain'
import { ContributedData } from '../../../common/types/crowdloanData'
import config from '../../../config'
import { Contribution, Contributor, Crowdloan } from '../../../model'
import { CrowdloanContributedEvent } from '../../../types/events'

function getEventData(ctx: EventHandlerContext): ContributedData {
    const event = new CrowdloanContributedEvent(ctx)

    if (event.isV9010) {
        const [account, paraId, amount] = event.asV9010
        return {
            account,
            paraId,
            amount,
        }
    } else {
        const [account, paraId, amount] = event.asLatest
        return {
            account,
            paraId,
            amount,
        }
    }
}

async function updateCrowdloanContributions(
    store: Store,
    options: { crowdloan: Crowdloan; contribution: Contribution }
) {
    const { crowdloan, contribution } = options

    crowdloan.contributors ??= []

    let contributor = crowdloan.contributors.find((contributor) => contributor.id === contribution.account)
    if (!contributor) {
        contributor = new Contributor({
            id: contribution.account as string,
            amount: 0n,
        })
        crowdloan.contributors.push(contributor)
    }

    contributor.amount += BigInt(contribution.amount || 0)
    crowdloan.raised += BigInt(contribution.amount || 0)

    await store.save(crowdloan)
}

async function saveContributedEvent(ctx: EventHandlerContext, data: ContributedData) {
    const id = ctx.event.id

    const parachain = await getOrCreateParachain(ctx.store, `${data.paraId}`)
    const crowdloanNum = parachain?.crowdloans.length || 0
    const crowdloan = await ctx.store.findOne(Crowdloan, `${data.paraId}-${crowdloanNum}`)
    if (!crowdloan) return

    const contribution = await getOrCreate(ctx.store, Contribution, id)

    populateMeta(ctx, contribution)

    contribution.chainName ??= config.chainName
    contribution.success ??= true

    contribution.amount ??= data.amount
    contribution.account ??= encodeID(data.account, config.chainName)
    contribution.crowdloan ??= crowdloan

    await ctx.store.save(contribution)

    await updateCrowdloanContributions(ctx.store, { crowdloan, contribution })
}

export async function handleContributed(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    await saveContributedEvent(ctx, data)
}
