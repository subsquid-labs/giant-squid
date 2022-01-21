import { EventHandlerContext } from "@subsquid/substrate-processor"
import { ProcessorConfig } from "../processorBase"
import { StakingData } from "./stakingData"
import { StakingTransaction } from "../../model"

export async function handleStakingEvent(ctx: EventHandlerContext,
    getter: (ctx: EventHandlerContext) => StakingData, config: ProcessorConfig) {
    let data = getter(ctx)

    let transaction = new StakingTransaction({
        id: `${config.idPrefix}-${ctx.event.id}`,
        chainName: config.chainName,
        blockHash: ctx.block.hash,
        blockNumber: ctx.event.blockNumber,
        extrinisicHash: ctx.extrinsic?.hash,
        date: new Date(ctx.block.timestamp),
        event: ctx.event.name,
        account: data.account,
        amount: data.amount,
    })

    await ctx.store.save(transaction)
}