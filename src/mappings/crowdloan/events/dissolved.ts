import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { crowdloanManager } from '../../../managers'
import { CrowdloanDissolvedEvent } from '../../../types/generated/events'

export interface EventData {
    index: number
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new CrowdloanDissolvedEvent(ctx)

    if (event.isV9110) {
        return {
            index: event.asV9110,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleDissolved(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    const crowdloan = await crowdloanManager.getByParaId(ctx, data.index)
    if (!crowdloan) return
}
