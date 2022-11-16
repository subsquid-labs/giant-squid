import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import { Era } from '../../../model'
import { DappsStakingNewDappStakingEraEvent } from '../../../types/events'

interface EventData {
    index: number
}

function getEventData(ctx: EventHandlerContext<Store>): EventData {
    const event = new DappsStakingNewDappStakingEraEvent(ctx)

    if (event.isV4) {
        const index = event.asV4
        return {
            index,
        }
    }
    ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
    try {
        const index = ctx._chain.decodeEvent(ctx.event)
        return {
            index,
        }
    } catch {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleNewEra(ctx: EventHandlerContext<Store>) {
    const { index } = getEventData(ctx)
    const era = new Era({
        id: index.toString(),
        index,
        timestamp: new Date(ctx.block.timestamp),
        startedAt: ctx.block.height,
        totalAppsRewardsReceived: 0n,
        totalStakerRewardsReceived: 0n,
    })
    await ctx.store.save(era)
}
