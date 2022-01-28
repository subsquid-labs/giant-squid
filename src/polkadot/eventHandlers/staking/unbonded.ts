import * as events from "../../types/events"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { StakingData } from "../../../common/mapping/stakingData"
import config from "../../config"
import { encodeID } from "../../../common/helpers"
import { handleStakingEvent } from "../../../common/mapping/stakingHandler"

function getUnbondedEvent(ctx: EventHandlerContext): StakingData {
    let event = new events.StakingUnbondedEvent(ctx)

    let [ account, amount ] = event.asLatest
    return {
        account: encodeID(account, config.chainName),
        amount: amount,
    }
}


export async function handleUnbondedEvent(ctx: EventHandlerContext) {
    await handleStakingEvent(ctx, getUnbondedEvent, config)
}