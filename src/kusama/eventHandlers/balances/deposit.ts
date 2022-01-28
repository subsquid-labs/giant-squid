import * as events from "../../types/events"

import { BalanceData } from "../../../common/mapping/balanceData"
import { EventHandlerContext } from "@subsquid/substrate-processor"
import config from "../../config"
import { encodeID } from "../../../common/helpers"
import { handleBalanceEvent } from "../../../common/mapping/balanceHandler"

function getDepositEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesDepositEvent(ctx)
    if (event.isV1032) {
        let [who, amount] = event.asV1032
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


export async function handleDepositEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, getDepositEvent, config)
}