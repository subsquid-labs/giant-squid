import { EventHandlerContext } from '@subsquid/substrate-processor'
import { DissolvedData } from '../../../types/custom/crowdloanData'
import { CrowdloanCreatedEvent } from '../../../types/generated/events'
import { getCrowdloan } from '../../../model/utils/entityUtils'

function getEventData(ctx: EventHandlerContext): DissolvedData {
    const event = new CrowdloanCreatedEvent(ctx)

    return {
        index: event.asV9110,
    }
}

export async function createCrowdloan(ctx: EventHandlerContext, data: DissolvedData) {
    const crowdloan = await getCrowdloan(ctx, data.index)
    if (!crowdloan) return

    await ctx.store.save(crowdloan)
}

export async function handleCreated(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    await createCrowdloan(ctx, data)
}
