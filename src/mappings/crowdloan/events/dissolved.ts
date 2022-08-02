import { UnknownVersionError } from '../../../common/errors'
import { CrowdloanDissolvedEvent } from '../../../types/generated/events'
import { EventContext, EventHandlerContext } from '../../types/contexts'

export interface EventData {
    index: number
}

function getEventData(ctx: EventContext): EventData {
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

    // const crowdloan = await crowdloanManager.getByParaId(ctx, data.index)
    // if (!crowdloan) return
}
