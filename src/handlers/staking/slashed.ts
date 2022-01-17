import * as events from "../../types/events"

import { StakingData, StakingEventType } from "../../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../../helpers/common"
import { handleStakingEvent } from "./baseHandler"

function getSlashedEvent(ctx: EventHandlerContext, old: boolean = false): StakingData {
    let event = new events.StakingSlashedEvent(ctx)

    let [ account, amount ] = event.asLatest
    return new StakingData({
        account: encodeID(account),
        amount: amount,
    })
}

function getSlashEvent(ctx: EventHandlerContext): StakingData {
    let event = new events.StakingSlashEvent(ctx)

    let [ account, amount ] = event.asLatest
    return new StakingData({
        account: encodeID(account),
        amount: amount,
    })
}

export async function handleSlashedEvent(ctx: EventHandlerContext, old: boolean = false) {
    await handleStakingEvent(ctx, StakingEventType.Slashed, old ? getSlashEvent : getSlashedEvent)
}