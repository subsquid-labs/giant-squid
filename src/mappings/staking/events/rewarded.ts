import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import { StakingRewardedEvent, StakingRewardEvent } from '../../../types/generated/events'
import { saveReward } from '../utils/savers'

interface EventData {
    amount: bigint
    account: Uint8Array
}

function getRewardedEventData(ctx: EventHandlerContext): EventData {
    const event = new StakingRewardedEvent(ctx)

    if (event.isV9090) {
        const [account, amount] = event.asV9090
        return {
            account,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

function getRewardEventData(ctx: EventHandlerContext): EventData | undefined {
    const event = new StakingRewardEvent(ctx)

    if (event.isV0) {
        const [account, amount] = event.asV0
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

    await saveReward(ctx, {
        account: encodeId(data.account),
        amount: data.amount,
    })
}

export const handleReward = (ctx: EventHandlerContext) => {
    return handleRewarded(ctx, true)
}
