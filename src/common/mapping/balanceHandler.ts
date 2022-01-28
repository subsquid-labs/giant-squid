import { BalanceData, CommonData, SetBalanceData, TransferData } from "./balanceData"
import { EventHandlerContext, Store } from "@subsquid/substrate-processor"

import { BalanceEvent } from "../../model"
import { ProcessorConfig } from "../processorBase"
import { createEvent, getOrCreate } from "../helpers"

export async function handleBalanceEvent(ctx: EventHandlerContext,
    getter: (ctx: EventHandlerContext) => BalanceData, config: ProcessorConfig) {
    const data = getter(ctx)
    const id = `${config.idPrefix}-${ctx.event.id}`

    const event = await createEvent(
        BalanceEvent,
        ctx,
        id,
        {
            chainName: config.chainName,
            from: (data as TransferData).from,
            to: (data as TransferData).to,
            account: (data as CommonData | SetBalanceData).account,
            amount: (data as CommonData | TransferData).amount,
            balanceStatus: (data as TransferData).status,
            free: (data as SetBalanceData).free,
            reserved: (data as SetBalanceData).reserved
        })

    await save(ctx.store, event);
}

async function save(store: Store, event: BalanceEvent) {
    await store.save(event).catch(e => save(store, event))
}
