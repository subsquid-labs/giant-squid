import * as events from "../../types/events"

import { BalanceData } from "../../../common/mapping/balanceData"
import { EventHandlerContext } from "@subsquid/substrate-processor"
import config from "../../config"
import { encodeID } from "../../../common/helpers"
import { handleBalanceEvent } from "../../../common/mapping/balanceHandler"

function getEndowedEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesEndowedEvent(ctx)
    if (event.isV1050) {
        let [account, amount] = event.asV1050
        return {
            account: encodeID(account, config.chainName),
            amount: amount,
        }
    } else {
        let { account, freeBalance } = event.asLatest
        return {
            account: encodeID(account, config.chainName),
            amount: freeBalance,
        }
    }
}


export async function handleEndowedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, getEndowedEvent, config)
}