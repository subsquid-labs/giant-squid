import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { RoundData } from '../../../types/custom/stakingData'
import { ParachainStakingNewRoundEvent } from '../../../types/generated/events'
import { roundManager } from '../../../managers'

function getEventData(ctx: EventHandlerContext): RoundData {
    const event = new ParachainStakingNewRoundEvent(ctx)

    if (event.isV900) {
        const [startingBlock, round, selectedCollatorsNumber, totalBalance] = event.asV900
        return { startingBlock, round, selectedCollatorsNumber, totalBalance }
    } else if (event.isV1300) {
        return event.asV1300
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleNewRound: EventHandler = async (ctx) => {
    const data = getEventData(ctx)
    if (!data) return

    await roundManager.save(ctx, data)
}
