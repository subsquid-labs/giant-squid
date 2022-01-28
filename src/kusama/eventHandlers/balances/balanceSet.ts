import * as events from "../../types/events"

import { BalanceData } from "../../../common/mapping/balanceData"
import { EventHandlerContext } from "@subsquid/substrate-processor"
import config from "../../config"
import { encodeID } from "../../../common/helpers"
import { handleBalanceEvent } from "../../../common/mapping/balanceHandler"

function getBalanceSetEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesBalanceSetEvent(ctx)
    if (event.isV1031) {
        let [account, free, res] = event.asV1031
        return {
            account: encodeID(account, config.chainName),
            free: free,
            reserved: res
        }
    } else {
        let { who, free, reserved } = event.asLatest
        return {
            account: encodeID(who, config.chainName),
            free: free,
            reserved: reserved
        }
    }
}


export async function handleBalanceSetEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, getBalanceSetEvent, config)
}