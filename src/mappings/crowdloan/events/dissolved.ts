import { EventHandlerContext } from '@subsquid/substrate-processor'
import { crowdloanManager } from '../../../managers'
import { DissolvedData } from '../../../types/custom/crowdloanData'
import { CrowdloanDissolvedEvent } from '../../../types/generated/events'

function getEventData(ctx: EventHandlerContext): DissolvedData {
    const event = new CrowdloanDissolvedEvent(ctx)

    if (event.isV9110) {
        return {
            index: event.asV9110,
        }
    } else {
        return {
            index: event.asLatest.paraId,
        }
    }
}

export async function dissolveCrowdloan(ctx: EventHandlerContext, data: DissolvedData) {
    const crowdloan = await crowdloanManager.get(ctx, data.index)
    if (!crowdloan) return

    await ctx.store.save(crowdloan)
}

export async function handleDissolved(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    await dissolveCrowdloan(ctx, data)
}
