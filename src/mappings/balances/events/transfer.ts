import { EventHandlerContext } from '@subsquid/substrate-processor'
import { encodeId } from '../../../common/tools'
import { BalancesTransferEvent } from '../../../types/kusama/events'
import { EventContext } from '../../../types/support'
import { ActionData } from '../../types/data'

interface EventData {
    from: string
    to: string
    amount: bigint
}

function getEventData(ctx: EventContext): EventData {
    let e = new BalancesTransferEvent(ctx)
    if (e.isV1020) {
        let [from, to, amount] = e.asV1020
        return { from: encodeId(from), to: encodeId(to), amount }
    } else if (e.isV1050) {
        let [from, to, amount] = e.asV1050
        return { from: encodeId(from), to: encodeId(to), amount }
    } else {
        let { from, to, amount } = e.asV9130
        return { from: encodeId(from), to: encodeId(to), amount }
    }
}

export interface TransferData extends ActionData {
    from: string
    to: string
    amount: bigint
}

export function processTransfer(
    ctx: EventHandlerContext<
        unknown,
        {
            event: {
                args: true
                extrinsic: { hash: true }
            }
        }
    >
) {
    const data = getEventData(ctx)

    return {
        id: ctx.event.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.event.extrinsic?.hash,
        from: data.from,
        to: data.to,
        amount: data.amount,
    }
}
