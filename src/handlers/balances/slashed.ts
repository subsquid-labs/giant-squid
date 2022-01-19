import * as events from "../../types/events"

import { BalanceData } from "./balanceData"
import { BalanceEventType } from "../../model"
import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../../helpers/common"
import { handleBalanceEvent } from "./baseHandler"

function getSlashedEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesSlashedEvent(ctx)
    if (event.isV9122) {
        let [who, amount] = event.asV9122
        return {
            account: encodeID(who),
            amount: amount,
        }
    } else {
        let { who, amount } = event.asLatest
        return {
            account: encodeID(who),
            amount: amount,
        }
    }
}


export async function handleSlashedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Slashed, getSlashedEvent)
}