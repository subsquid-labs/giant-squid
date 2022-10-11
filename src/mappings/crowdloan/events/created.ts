import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import { Crowdloan } from '../../../model'
import storage from '../../../storage'
import { CrowdloanCreatedEvent } from '../../../types/kusama/events'
import { EventContext } from '../../types/contexts'
import { getOrCreateParachain } from '../../util/entities'

function getEventData(ctx: EventContext): number {
    const event = new CrowdloanCreatedEvent(ctx)

    if (event.isV9010) {
        return event.asV9010
    } else if (event.isV9230) {
        return event.asV9230.paraId
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function processCreated(ctx: EventHandlerContext<Store, { event: true }>): number {
    return getEventData(ctx)
}
