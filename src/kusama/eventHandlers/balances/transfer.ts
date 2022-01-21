import * as events from "../../types/events"

import { BalanceData } from "../../../common/mapping/balanceData"
import { EventHandlerContext } from "@subsquid/substrate-processor"
import config from "../../config"
import { encodeID } from "../../../common/helpers"
import { handleBalanceEvent } from "../../../common/mapping/balanceHandler"

function getTransferEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesTransferEvent(ctx)
    if (event.isV1020) {
        let [from, to, amount] = event.asV1020
        return {
            from: encodeID(from, config.chainName),
            to: encodeID(to, config.chainName),
            amount: amount
        }
    } else if (event.isV1050) {
        let [from, to, amount] = event.asV1050
        return {
            from: encodeID(from, config.chainName),
            to: encodeID(to, config.chainName),
            amount: amount
        }
    } else {
        let { from, to, amount } = event.asLatest
        return {
            from: encodeID(from, config.chainName),
            to: encodeID(to, config.chainName),
            amount: amount
        }
    }
}


export async function handleTransferEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, getTransferEvent, config)
}