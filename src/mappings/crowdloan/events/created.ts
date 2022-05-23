import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { crowdloanManager } from '../../../managers'
import storage from '../../../storage'
import { DissolvedData } from '../../../types/custom/crowdloanData'
import { CrowdloanCreatedEvent } from '../../../types/generated/events'

function getEventData(ctx: EventHandlerContext): DissolvedData {
    const event = new CrowdloanCreatedEvent(ctx)

    if (event.isV9110) {
        return {
            index: event.asV9110,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
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
