import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../../common/errors'
import { ParachainStakingNominationEvent } from '../../../../types/generated/events'
import { saveBondEvent } from '../../utils/base'

interface EventData {
    account: Uint8Array
    amount: bigint
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingNominationEvent(ctx)

    if (event.isV49) {
        const [account, amount] = event.asV49
        return {
            account,
            amount,
        }
    } else if (event.isV53) {
        const [account, amount] = event.asV53
        return {
            account,
            amount,
        }
    } else if (event.isV155) {
        const [account, amount] = event.asV155
        return {
            account,
            amount,
        }
    } else if (event.isV900) {
        const [account, amount] = event.asV900
        return {
            account,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export const handleNomination: EventHandler = async (ctx) => {
    const data = getEventData(ctx)

    await saveBondEvent(ctx, data)
}
