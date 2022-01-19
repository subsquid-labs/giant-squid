import { BalanceData, CommonData, SetBalanceData, TransferData } from "./balanceData"
import { BalanceEventType, BalanceTransaction } from "../../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"

export async function handleBalanceEvent(ctx: EventHandlerContext,
    eventType: BalanceEventType,
    getter: (ctx: EventHandlerContext) => BalanceData) {
    let data = getter(ctx)

    let transaction = new BalanceTransaction({
        id: ctx.event.id,
        blockHash: ctx.block.hash,
        blockNumber: ctx.event.blockNumber,
        extrinisicHash: ctx.extrinsic?.hash,
        date: new Date(ctx.block.timestamp),
        event: eventType,
        from: (data as TransferData).from,
        to: (data as TransferData).to,
        account: (data as CommonData | SetBalanceData).account,
        amount: (data as CommonData | TransferData).amount,
        status: (data as TransferData).status,
        free: (data as SetBalanceData).free,
        reserved: (data as SetBalanceData).reserved
    })

    await ctx.store.save(transaction)
}