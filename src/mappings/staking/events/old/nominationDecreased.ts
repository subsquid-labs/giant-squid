import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../../common/errors'
import { BondType } from '../../../../model'
import { ParachainStakingNominationDecreasedEvent } from '../../../../types/generated/events'
import { saveBondEvent } from '../../utils/base'

interface EventData {
    account: Uint8Array
    amount: bigint
    candidate: Uint8Array
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingNominationDecreasedEvent(ctx)

    if (event.isV49) {
        const [account, candidate, amount] = event.asV49
        return {
            account,
            amount: -amount,
            candidate,
        }
    } else if (event.isV53) {
        const [account, candidate, amount] = event.asV53
        return {
            account,
            amount: -amount,
            candidate,
        }
    } else if (event.isV501) {
        const [account, candidate, amount] = event.asV501
        return {
            account,
            amount: -amount,
            candidate,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export const handleNominationDecreased: EventHandler = async (ctx) => {
    const data = getEventData(ctx)

    await saveBondEvent(ctx, {
        ...data,
        type: BondType.Unbond,
    })
}
