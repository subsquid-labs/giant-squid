import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../../common/errors'
import { BondType } from '../../../../model'
import { ParachainStakingNominationIncreasedEvent } from '../../../../types/generated/events'
import { saveBondEvent } from '../../utils/base'

interface EventData {
    account: Uint8Array
    amount: bigint
    candidate: Uint8Array
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingNominationIncreasedEvent(ctx)

    if (event.isV900) {
        const [account, candidate, amount] = event.asV900
        return {
            account,
            amount,
            candidate,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleNominationIncreased: EventHandler = async (ctx) => {
    const data = getEventData(ctx)

    await saveBondEvent(ctx, {
        ...data,
        type: BondType.Bond,
    })
}
