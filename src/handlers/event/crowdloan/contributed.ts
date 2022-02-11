import { EventHandlerContext } from '@subsquid/substrate-processor'
import { encodeID, getOrCreate, populateMeta } from '../../../common/helpers'
import { getOrCreateParachain } from '../../../common/parachain'
import { ContributionData } from '../../../common/types/crowdloanData'
import config from '../../../config'
import { Contribution, Contributor, Crowdloan } from '../../../model'
import { CrowdloanContributedEvent } from '../../../types/events'

function getEventData(ctx: EventHandlerContext): ContributionData {
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

async function saveContributedEvent(ctx: EventHandlerContext, data: ContributionData) {
    const id = ctx.event.id

    const parachain = await getOrCreateParachain(ctx.store, `${data.paraId}`)
    const crowdloanNum = parachain?.crowdloans.length || 0
    const crowdloan = await ctx.store.findOne(Crowdloan, `${data.paraId}-${crowdloanNum}`)
    if (!crowdloan) return

    const contribution = await getOrCreate(ctx.store, Contribution, {
        id,
    })

    populateMeta(ctx, contribution)

    contribution.chainName ??= config.chainName
    contribution.success = true

    contribution.amount ??= data.amount
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    contribution.account ??= encodeID(data.account!, config.chainName)
    contribution.crowdloan ??= crowdloan

    await ctx.store.save(contribution)

    crowdloan.contributors ??= []

    let contributor = crowdloan.contributors.find((contributor) => contributor.id === contribution.account)
    if (!contributor) {
        contributor = new Contributor({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            id: contribution.account!,
            amount: 0n,
        })
        crowdloan.contributors.push(contributor)
    }

    contributor.amount += BigInt(contribution.amount)
    crowdloan.raised += BigInt(contribution.amount)

    await ctx.store.save(crowdloan)
}

export async function handleContributed(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    await saveContributedEvent(ctx, data)
}
