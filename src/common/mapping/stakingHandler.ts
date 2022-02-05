import { EventHandlerContext, Store } from "@subsquid/substrate-processor"

import { ProcessorConfig } from "../processorBase"
import { StakingData } from "./stakingData"
import { StakingEvent } from "../../model"
import { createEvent } from "../helpers"

export async function handleStakingEvent(ctx: EventHandlerContext,
    data: StakingData, config: ProcessorConfig) {
    const id = `${ctx.event.id}`

    const event = await createEvent(
        StakingEvent,
        ctx,
        id,
        {
            chainName: config.chainName,
            account: data.account,
            amount: data.amount,
        }
    )

    await save(ctx.store, event);
}

async function save(store: Store, transaction: StakingEvent) {
    await store.save(transaction).catch(e => save(store, transaction))
}
