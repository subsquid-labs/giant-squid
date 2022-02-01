import * as events from "../../types/events"

import { BalanceData } from "../../../common/mapping/balanceData"
import { EventHandlerContext } from "@subsquid/substrate-processor"
import config from "../../config"
import { encodeID } from "../../../common/helpers"
import { handleBalanceEvent } from "../../../common/mapping/balanceHandler"

function getWithdrawEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesWithdrawEvent(ctx)
    if (event.isV9122) {
        let [who, amount] = event.asV9122
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


export async function handleWithdrawEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, getWithdrawEvent, config)
}