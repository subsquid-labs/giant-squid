import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import { Crowdloan } from '../../../model'
import storage from '../../../storage'
import { CrowdloanCreatedEvent } from '../../../types/generated/events'
import { EventContext } from '../../types/contexts'
import { getOrCreateParachain } from '../../util/entities'

interface EventData {
    index: number
}

function getEventData(ctx: EventContext): EventData {
    const event = new CrowdloanCreatedEvent(ctx)

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

export async function handleCreated(ctx: EventHandlerContext<Store, { event: true }>) {
    const data = getEventData(ctx)

    const fundInfo = await storage.crowdloan.getFunds(ctx, data.index)
    if (!fundInfo) return

    const parachain = await getOrCreateParachain(ctx, data.index)

    await ctx.store.insert(
        new Crowdloan({
            id: `${data.index}-${fundInfo.fundIndex}`,
            parachain,
            start: ctx.block.height,
            createdAt: new Date(ctx.block.timestamp),
            ...fundInfo,
        })
    )
}
