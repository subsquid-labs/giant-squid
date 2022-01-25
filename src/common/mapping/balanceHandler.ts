import { BalanceData, CommonData, SetBalanceData, TransferData } from "./balanceData"
import { EventHandlerContext, Store } from "@subsquid/substrate-processor"

import { BalanceTransaction } from "../../model"
import { ProcessorConfig } from "../processorBase"

export async function handleBalanceEvent(ctx: EventHandlerContext,
    getter: (ctx: EventHandlerContext) => BalanceData, config: ProcessorConfig) {
    let data = getter(ctx)

    let transaction = new BalanceTransaction({
        id: `${config.idPrefix}-${ctx.event.id}`,
        chainName: config.chainName,
        blockHash: ctx.block.hash,
        blockNumber: ctx.event.blockNumber,
        extrinisicHash: ctx.extrinsic?.hash,
        date: new Date(ctx.block.timestamp),
        event: ctx.event.name,
        from: (data as TransferData).from,
        to: (data as TransferData).to,
        account: (data as CommonData | SetBalanceData).account,
        amount: (data as CommonData | TransferData).amount,
        balanceStatus: (data as TransferData).status,
        free: (data as SetBalanceData).free,
        reserved: (data as SetBalanceData).reserved,
    })

    await save(ctx.store, transaction);
}

async function save(store: Store, transaction: BalanceTransaction) {
    await store.save(transaction).catch(e => save(store, transaction))
}
