import { EventHandlerContext } from '@subsquid/substrate-processor'
import { crowdloanManager } from '../../../managers'
import storage from '../../../storage'
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
    const fundInfo = await storage.crowdloan.getFunds(ctx, data.index)
    if (!fundInfo) return

    await crowdloanManager.create(ctx, {
        paraId: data.index,
        ...fundInfo,
    })
}

export async function handleCreated(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    await createCrowdloan(ctx, data)
}
