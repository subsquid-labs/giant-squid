import { EventHandlerContext } from '@subsquid/substrate-processor'
import { crowdloanManager } from '../../../managers'
import { DissolvedData } from '../../../types/custom/crowdloanData'
import { CrowdloanCreatedEvent } from '../../../types/generated/events'

function getEventData(ctx: EventHandlerContext): DissolvedData {
    const event = new CrowdloanCreatedEvent(ctx)

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

export async function createCrowdloan(ctx: EventHandlerContext, data: DissolvedData) {
    const crowdloan = await crowdloanManager.get(ctx, data.index)
    if (!crowdloan) return

    await ctx.store.save(crowdloan)
}

export async function handleCreated(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    await createCrowdloan(ctx, data)
}
