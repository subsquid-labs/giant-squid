import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { RewardData } from '../../../types/custom/stakingData'
import { StakingRewardedEvent, StakingRewardEvent } from '../../../types/generated/events'
import { saveRewardEvent } from '../utils/base'

function getRewardEventData(ctx: EventHandlerContext): RewardData | undefined {
    const event = new StakingRewardEvent(ctx)

    if (event.isV13) {
        const [account, amount] = event.asV13
        return {
            account,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

function getRewardedEventData(ctx: EventHandlerContext): RewardData | undefined {
    const event = new StakingRewardedEvent(ctx)

    if (event.isV29) {
        const [account, amount] = event.asV29
        return {
            account,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleRewarded(ctx: EventHandlerContext, old = false) {
    const data = old ? getRewardEventData(ctx) : getRewardedEventData(ctx)
    if (!data) return

    await saveRewardEvent(ctx, data)
}

export const handleReward = (ctx: EventHandlerContext) => handleRewarded(ctx, true)
