import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { BalancesTransferEvent } from '../../../types/generated/events'
import { saveTransfer } from '../utils/saver'
import { encodeId } from '../../../common/helpers'

interface EventData {
    from: Uint8Array
    to: Uint8Array
    amount: bigint
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new BalancesTransferEvent(ctx)
    if (event.isV900) {
        const [from, to, amount] = event.asV900
        return {
            from,
            to,
            amount,
        }
    } else if (event.isV1201) {
        const { from, to, amount } = event.asV1201
        return {
            from,
            to,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleTransfer(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    await saveTransfer(ctx, {
        from: encodeId(data.from),
        to: encodeId(data.to),
        amount: data.amount,
    })
}
