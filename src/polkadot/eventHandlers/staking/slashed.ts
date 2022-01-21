import * as events from "../../types/events"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { StakingData } from "../../../common/mapping/stakingData"
import config from "../../config"
import { encodeID } from "../../../common/helpers"
import { handleStakingEvent } from "../../../common/mapping/stakingHandler"

function getSlashedEvent(ctx: EventHandlerContext, old: boolean = false): StakingData {
    let event = new events.StakingSlashedEvent(ctx)

    let [ account, amount ] = event.asLatest
    return {
        account: encodeID(account, config.chainName),
        amount: amount,
    }
}

function getSlashEvent(ctx: EventHandlerContext): StakingData {
    let event = new events.StakingSlashEvent(ctx)

    let [ account, amount ] = event.asLatest
    return {
        account: encodeID(account, config.chainName),
        amount: amount,
    }
}

export async function handleSlashedEvent(ctx: EventHandlerContext, old: boolean = false) {
    await handleStakingEvent(ctx, old ? getSlashEvent : getSlashedEvent, config)
}

export const handleSlashEvent = (ctx: EventHandlerContext) => {return handleSlashedEvent(ctx, true)}
