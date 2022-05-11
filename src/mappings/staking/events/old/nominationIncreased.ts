import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../../common/errors'
import { ParachainStakingNominationIncreasedEvent } from '../../../../types/generated/events'
import { saveBondEvent } from '../../utils/base'

interface EventData {
    account: Uint8Array
    amount: bigint
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingNominationIncreasedEvent(ctx)

    if (event.isV900) {
        const [account, , amount] = event.asV900
        return {
            account,
            amount,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleNominationIncreased: EventHandler = async (ctx) => {
    const data = getEventData(ctx)

    await saveBondEvent(ctx, data)
}
