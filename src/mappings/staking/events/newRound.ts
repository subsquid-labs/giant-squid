import { UnknownVersionError } from '../../../common/errors'
import { ParachainStakingNewRoundEvent } from '../../../types/generated/events'
import { EventContext, EventHandlerContext } from '../../types/contexts'
import { Round } from '../../../model'

export interface EventData {
    startingBlock: number
    round: number
    selectedCollatorsNumber: number
    totalBalance: bigint
}

function getEventData(ctx: EventContext): EventData {
    const event = new ParachainStakingNewRoundEvent(ctx)

    if (event.isV900) {
        const [startingBlock, round, selectedCollatorsNumber, totalBalance] = event.asV900
        return { startingBlock, round, selectedCollatorsNumber, totalBalance }
    } else if (event.isV1300) {
        return event.asV1300
    }
    throw new UnknownVersionError(event.constructor.name)
}

export async function handleNewRound(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    await ctx.store.insert(
        new Round({
            id: ctx.event.id,
            index: data.round,
            timestamp: new Date(ctx.block.timestamp),
            startedAt: ctx.block.height,
            collatorsCount: data.selectedCollatorsNumber,
            total: data.totalBalance,
        })
    )
}
