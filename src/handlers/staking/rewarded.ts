import * as events from "../../types/events"

import { StakingData, StakingEventType } from "../../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../../helpers/common"
import { handleStakingEvent } from "./baseHandler"

function getRewardedEvent(ctx: EventHandlerContext): StakingData {
    let event = new events.StakingRewardedEvent(ctx)

    let [ account, amount ] = event.asLatest
    return new StakingData({
        account: encodeID(account),
        amount: amount,
    })
}

function getRewardEvent(ctx: EventHandlerContext): StakingData {
    let event = new events.StakingRewardEvent(ctx)

    let [ account, amount ] = event.asLatest
    return new StakingData({
        account: encodeID(account),
        amount: amount,
    })
}

export async function handleRewardedEvent(ctx: EventHandlerContext, old: boolean = false) {
    await handleStakingEvent(ctx, StakingEventType.Rewarded, old ? getRewardEvent : getRewardedEvent)
}