import * as events from "../../types/events"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { RewardData } from "../../common/mapping/stakingData"
import { parseRewardEvent } from "./base"

function getSlashedEvent(ctx: EventHandlerContext, old: boolean = false): RewardData {
    let event = new events.StakingSlashedEvent(ctx)

    let [account, amount] = event.asLatest
    return {
        account: account,
        amount: amount,
    }
}

function getSlashEvent(ctx: EventHandlerContext): RewardData {
    let event = new events.StakingSlashEvent(ctx)

    let [account, amount] = event.asLatest
    return {
        account: account,
        amount: amount,
    }
}

const parseSlashEvent = parseRewardEvent

export async function handleSlashedEvent(ctx: EventHandlerContext, old: boolean = false) {
    const data = old ? getSlashEvent(ctx) : getSlashedEvent(ctx)
    await parseSlashEvent(ctx, data)
}

export const handleSlashEvent = (ctx: EventHandlerContext) => { return handleSlashedEvent(ctx, true) }
