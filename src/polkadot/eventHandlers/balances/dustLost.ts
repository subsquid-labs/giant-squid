import * as events from "../../types/events"

import { BalanceData } from "../../../common/mapping/balanceData"
import { EventHandlerContext } from "@subsquid/substrate-processor"
import config from "../../config"
import { encodeID } from "../../../common/helpers"
import { handleBalanceEvent } from "../../../common/mapping/balanceHandler"

function getDustLostEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesDustLostEvent(ctx)
    if (event.isV0) {
        let [account, amount] = event.asV0
        return {
            account: encodeID(account, config.chainName),
            amount: amount,
        }
    } else {
        let { account, amount } = event.asLatest
        return {
            account: encodeID(account, config.chainName),
            amount: amount,
        }
    }
}


export async function handleDustLostEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, getDustLostEvent, config)
}