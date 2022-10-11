import { UnknownVersionError } from '../../../common/errors'
import { CrowdloanDissolvedEvent } from '../../../types/kusama/events'
import { EventContext, EventHandlerContext } from '../../types/contexts'

function getEventData(ctx: EventContext): number {
    const event = new CrowdloanDissolvedEvent(ctx)

    if (event.isV9010) {
        return event.asV9010
    } else if (event.isV9230) {
        return event.asV9230.paraId
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function processDissolved(ctx: EventHandlerContext) {
    return getEventData(ctx)
}
