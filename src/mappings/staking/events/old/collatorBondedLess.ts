import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../../common/errors'
import { ParachainStakingCollatorBondedLessEvent } from '../../../../types/generated/events'
import { saveBondEvent } from '../../utils/base'

interface EventData {
    account: Uint8Array
    amount: bigint
    newTotal: bigint
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingCollatorBondedLessEvent(ctx)

    if (event.isV900) {
        const [account, amount, newTotal] = event.asV900
        return {
            account,
            amount: -amount,
            newTotal,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleCollatorBondedLess: EventHandler = async (ctx) => {
    const data = getEventData(ctx)

    await saveBondEvent(ctx, data)
}
