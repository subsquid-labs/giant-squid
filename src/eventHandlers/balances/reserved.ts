import * as events from "../../types/events"

import { BalanceData } from "../../../common/mapping/balanceData"
import { EventHandlerContext } from "@subsquid/substrate-processor"
import config from "../../config"
import { encodeID } from "../../../common/helpers"
import { handleBalanceEvent } from "../../../common/mapping/balanceHandler"

function getReservedEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesReservedEvent(ctx)
    if (event.isV8) {
        let [who, amount] = event.asV8
        return {
            account: encodeID(who, config.chainName),
            amount: amount,
        }
    } else {
        let { who, amount } = event.asLatest
        return  {
            account: encodeID(who, config.chainName),
            amount: amount,
        }
    }
}


export async function handleReservedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, getReservedEvent, config)
}