import { TransferData } from '../../../types/custom/balanceData'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import { saveTransferEvent } from '../utils/base'
import { UnknownVersionError } from '../../../common/errors'
import { BalancesTransferEvent } from '../../../types/generated/events'

function getEventData(ctx: EventHandlerContext): TransferData {
    const event = new BalancesTransferEvent(ctx)
    if (event.isV49) {
        const [from, to, amount] = event.asV49
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

    await saveTransferEvent(ctx, data)
}
