import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../../common/errors'
import { ParachainStakingNominatorLeftCollatorEvent } from '../../../../types/generated/events'
import { saveBondEvent } from '../../utils/base'

interface EventData {
    account: Uint8Array
    amount: bigint
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingNominatorLeftCollatorEvent(ctx)

    if (event.isV49) {
        const [account, , amount] = event.asV49
        return {
            account,
            amount: -amount,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleNominatorLeftCandidate: EventHandler = async (ctx) => {
    const data = getEventData(ctx)

    await saveBondEvent(ctx, data)
}
