import { UnknownVersionError } from '../../../common/errors'
import {logEvent} from '../../../common/tools'
import { CrowdloanDissolvedEvent } from '../../../types/generated/events'
import { EventContext, EventHandlerContext } from '../../types/contexts'

export interface EventData {
    index: number
}

function getEventData(ctx: EventContext): EventData {
    const event = new CrowdloanDissolvedEvent(ctx)

    if (event.isV9010) {
        return {
            index: event.asV9010,
        }
    } else if (event.isV9230) {
        return {
            index: event.asV9230.paraId,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleDissolved(ctx: EventHandlerContext) {
    logEvent(ctx)

    const data = getEventData(ctx)

    // const crowdloan = await crowdloanManager.getByParaId(ctx, data.index)
    // if (!crowdloan) return
}
