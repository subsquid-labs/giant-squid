import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../../common/errors'
import { BondType } from '../../../../model'
import { ParachainStakingNominationEvent } from '../../../../types/generated/events'
import { saveBondEvent } from '../../utils/base'

interface EventData {
    account: Uint8Array
    amount: bigint
    candidate: Uint8Array
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingNominationEvent(ctx)

    if (event.isV49) {
        const [account, amount, candidate] = event.asV49
        return {
            account,
            amount,
            candidate,
        }
    } else if (event.isV53) {
        const [account, amount, candidate] = event.asV53
        return {
            account,
            amount,
            candidate,
        }
    } else if (event.isV155) {
        const [account, amount, candidate] = event.asV155
        return {
            account,
            amount,
            candidate,
        }
    } else if (event.isV900) {
        const [account, amount, candidate] = event.asV900
        return {
            account,
            amount,
            candidate,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export const handleNomination: EventHandler = async (ctx) => {
    const data = getEventData(ctx)

    await saveBondEvent(ctx, {
        ...data,
        type: BondType.Bond,
    })
}
