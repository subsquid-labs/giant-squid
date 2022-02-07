import { StakingRewardedEvent, StakingRewardEvent } from "../../types/events"
import { EventHandlerContext } from "@subsquid/substrate-processor"
import { RewardData } from "../../common/mapping/stakingData"
import { saveRewardEvent } from "./base"

function getRewardedEventData(ctx: EventHandlerContext): RewardData {
    let event = new StakingRewardedEvent(ctx)

    if (event.isV9090) {
        let [account, amount] = event.asV9090
        return {
            account: account,
            amount: amount,
        }
    }
    else {
        let [account, amount] = event.asLatest
        return {
            account: account,
            amount: amount,
        }
    }
}

function getRewardEventData(ctx: EventHandlerContext): RewardData {
    let event = new StakingRewardEvent(ctx)

    let [account, amount] = event.asLatest
    return {
        account: account,
        amount: amount,
    }
}

export async function handleRewarded(ctx: EventHandlerContext, old: boolean = false) {
    const data = old ? getRewardEventData(ctx) : getRewardedEventData(ctx)
    await saveRewardEvent(ctx, data)
}

export const handleReward = (ctx: EventHandlerContext) => { return handleRewarded(ctx, true) }