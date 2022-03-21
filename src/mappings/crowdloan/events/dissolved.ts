import { EventHandlerContext } from '@subsquid/substrate-processor'
import { DissolvedData } from '../../../types/custom/crowdloanData'
import { CrowdloanDissolvedEvent } from '../../../types/generated/events'
import { getCrowdloan } from '../../../model/utils/entityUtils'

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
    const crowdloan = await getCrowdloan(ctx, data.index)
    if (!crowdloan) return

    await ctx.store.save(crowdloan)
}

export async function handleDissolved(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    await dissolveCrowdloan(ctx, data)
}
