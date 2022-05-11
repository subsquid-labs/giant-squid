import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { ParachainStakingDelegationIncreasedEvent } from '../../../types/generated/events'
import { saveBondEvent } from '../utils/base'

interface EventData {
    account: Uint8Array
    amount: bigint
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingDelegationIncreasedEvent(ctx)

    if (event.isV1001) {
        const [account, , amount] = event.asV1001
        return {
            account,
            amount,
        }
    } else if (event.isV1300) {
        const { candidate: account, amount: amount } = event.asV1300
        return {
            account,
            amount,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleDelegationIncreased: EventHandler = async (ctx) => {
    const data = getEventData(ctx)

    await saveBondEvent(ctx, data)
}
