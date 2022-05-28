import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { ParachainStakingNewRoundEvent } from '../../../types/generated/events'
import { roundManager } from '../../../managers'

export interface EventData {
    startingBlock: number
    round: number
    selectedCollatorsNumber: number
    totalBalance: bigint
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingNewRoundEvent(ctx)

    if (event.isV49) {
        const [startingBlock, round, selectedCollatorsNumber, totalBalance] = event.asV49
        return { startingBlock, round, selectedCollatorsNumber, totalBalance }
    } else if (event.isV1300) {
        return event.asV1300
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleNewRound: EventHandler = async (ctx) => {
    const data = getEventData(ctx)
    if (!data) return

    await roundManager.create(ctx, data)
}
