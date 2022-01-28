import * as events from "../../types/events"

import { BalanceData } from "../../../common/mapping/balanceData"
import { EventHandlerContext } from "@subsquid/substrate-processor"
import config from "../../config"
import { encodeID } from "../../../common/helpers"
import { handleBalanceEvent } from "../../../common/mapping/balanceHandler"

function getUnreservedEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesUnreservedEvent(ctx)
    if (event.isV8) {
        let [who, amount] = event.asV8
        return {
            account: encodeID(who, config.chainName),
            amount: amount,
        }
    } else {
        let { who, amount } = event.asLatest
        return {
            account: encodeID(who, config.chainName),
            amount: amount,
        }
    }
}

export async function handleUnreservedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, getUnreservedEvent, config)
}