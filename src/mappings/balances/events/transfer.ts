import { encodeId, getOriginAccountId, logEvent } from '../../../common/tools'
import { BalancesTransferEvent } from '../../../types/generated/events'
import { EventContext } from '../../../types/generated/support'
import { EventHandlerContext } from '../../types/contexts'
import { ActionData } from '../../types/data'
import { saveTransfer } from '../../util/entities'

interface EventData {
    from: Uint8Array
    to: Uint8Array
    amount: bigint
}

function getEventData(ctx: EventContext): EventData {
    let e = new BalancesTransferEvent(ctx)
    if (e.isV1020) {
        let [from, to, amount] = e.asV1020
        return { from, to, amount }
    } else if (e.isV1050) {
        let [from, to, amount] = e.asV1050
        return { from, to, amount }
    } else {
        return e.asV9130
    }
}

export interface TransferData extends ActionData {
    from: string
    to: string
    amount: bigint
}

export async function handleTransfer(ctx: EventHandlerContext) {
    logEvent(ctx)

    const data = getEventData(ctx)
    if (!data) return

    await saveTransfer(ctx, {
        id: ctx.event.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.event.extrinsic?.hash,
        fromId: encodeId(data.from),
        toId: encodeId(data.to),
        amount: data.amount,
        success: true,
    })
}
