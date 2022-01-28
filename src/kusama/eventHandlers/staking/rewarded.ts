import * as events from "../../types/events"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { StakingData } from "../../../common/mapping/stakingData"
import config from "../../config"
import { encodeID } from "../../../common/helpers"
import { handleStakingEvent } from "../../../common/mapping/stakingHandler"

function getRewardedEvent(ctx: EventHandlerContext): StakingData {
    let event = new events.StakingRewardedEvent(ctx)

    let [ account, amount ] = event.asLatest
    return {
        account: encodeID(account, config.chainName),
        amount: amount,
    }
}

function getRewardEvent(ctx: EventHandlerContext): StakingData {
    let event = new events.StakingRewardEvent(ctx)

    if (event.isV1020) {
        let [amount, amount2] = event.asV1020
        return {
            account: 'null',
            amount: amount + amount2,
        }
    } else {
        let [ account, amount ] = event.asLatest
        return {
            account: encodeID(account, config.chainName),
            amount: amount,
        }
    }
}

export async function handleRewardedEvent(ctx: EventHandlerContext, old: boolean = false) {
    await handleStakingEvent(ctx, old ? getRewardEvent : getRewardedEvent, config)
}

export const handleRewardEvent = (ctx: EventHandlerContext) => {return handleRewardedEvent(ctx, true)}
