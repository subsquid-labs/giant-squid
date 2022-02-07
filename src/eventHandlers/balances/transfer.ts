import { BalancesTransferEvent } from "../../types/events"

import { TransferData } from "../../common/mapping/balanceData"
import { EventHandlerContext, SubstrateExtrinsic } from "@subsquid/substrate-processor"
import config from "../../config"
import { encodeID, getOrCreate } from "../../common/helpers"
import { Transfer } from "../../model"
import { snakeCase } from "snake-case"

function getEventData(ctx: EventHandlerContext): TransferData {
    let event = new BalancesTransferEvent(ctx)
    if (event.isV0) {
        let [from, to, amount] = event.asV0
        return {
            from: from,
            to: to,
            amount: amount
        }
    } else {
        let { from, to, amount } = event.asLatest
        return {
            from: from,
            to: to,
            amount: amount
        }
    }
}

function checkExtrinsic(extrinsic: SubstrateExtrinsic): boolean {
    return extrinsic.section == 'balances' &&
        Object.keys(config.extrinsicsHandlers || {}).find(name => extrinsic.name == name) != undefined
}

async function parseTransferEvent(ctx: EventHandlerContext, data: TransferData) {
    const id = `${ctx.extrinsic?.id}`

    const transfer = await getOrCreate(ctx.store, Transfer, id)

    transfer.amount = data.amount
    transfer.from = encodeID(data.from!, config.chainName)
    transfer.to = encodeID(data.to, config.chainName)
    transfer.date = transfer.date || new Date(ctx.event.blockTimestamp)

    await ctx.store.save(transfer)
}

export async function handleTransfer(ctx: EventHandlerContext) {
    if (ctx.extrinsic)
        ctx.extrinsic.name = `${ctx.extrinsic.section}.${snakeCase(ctx.extrinsic.method)}`

    if (!ctx.extrinsic || !checkExtrinsic(ctx.extrinsic))
        return;

    const data = getEventData(ctx)

    await parseTransferEvent(ctx, data)
}