import { EventHandlerContext } from '@subsquid/substrate-processor'
import { getOrCreateParachain } from '../../../common/parachain'
import { DissolvedData } from '../../../common/types/crowdloanData'
import { CrowdloanStatus } from '../../../model'
import { CrowdloanDissolvedEvent } from '../../../types/events'

function getEventData(ctx: EventHandlerContext): DissolvedData {
    const event = new CrowdloanDissolvedEvent(ctx)

    if (event.isV9010) {
        return {
            index: event.asV9010,
        }
    } else {
        return {
            index: event.asLatest,
        }
    }
}

export async function dissolveCrowdloan(ctx: EventHandlerContext, data: DissolvedData) {
    const parachain = await getOrCreateParachain(ctx.store, `${data.index}`)

    const lastCrowdloan = parachain.crowdloans[parachain.crowdloans.length - 1]
    if (!lastCrowdloan) return

    lastCrowdloan.status = CrowdloanStatus.Dissolved

    await ctx.store.save(lastCrowdloan)
}

export async function handleDissolved(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    await dissolveCrowdloan(ctx, data)
}