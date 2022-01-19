import * as events from "../../types/events"

import { BalanceData } from "./balanceData"
import { BalanceEventType } from "../../model"
import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../../helpers/common"
import { handleBalanceEvent } from "./baseHandler"

function getDustLostEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesDustLostEvent(ctx)
    if (event.isV0) {
        let [account, amount] = event.asV0
        return {
            account: encodeID(account),
            amount: amount,
        }
    } else {
        let { account, amount } = event.asLatest
        return {
            account: encodeID(account),
            amount: amount,
        }
    }
}


export async function handleDustLostEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.DustLost, getDustLostEvent)
}