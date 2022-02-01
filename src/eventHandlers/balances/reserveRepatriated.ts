import * as events from "../../types/events"

import { BalanceData } from "../../../common/mapping/balanceData"
import { EventHandlerContext } from "@subsquid/substrate-processor"
import config from "../../config"
import { encodeID } from "../../../common/helpers"
import { handleBalanceEvent } from "../../../common/mapping/balanceHandler"

function getReserveRepatriatedEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesReserveRepatriatedEvent(ctx)
    if (event.isV8) {
        let [from, to, amount, status] = event.asV8
        return{
            from: encodeID(from, config.chainName),
            to: encodeID(to, config.chainName),
            amount: amount,
            status: String(status)
        }
    } else {
        return {
            from: encodeID(event.asLatest.from, config.chainName),
            to: encodeID(event.asLatest.to, config.chainName),
            amount: event.asLatest.amount,
            status: String(event.asLatest.destinationStatus)
        }
    }
}

export async function handleReserveRepatriatedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, getReserveRepatriatedEvent, config)
}