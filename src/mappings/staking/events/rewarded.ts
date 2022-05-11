import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { RewardData } from '../../../types/custom/stakingData'
import { saveRewardedEvent } from '../utils/base'
import { ParachainStakingRewardedEvent } from '../../../types/generated/events'

function getEventData(ctx: EventHandlerContext): RewardData | undefined {
    const event = new ParachainStakingRewardedEvent(ctx)

    if (event.isV900) {
        const [account, amount] = event.asV900
        return {
            account,
            amount,
        }
    } else if (event.isV1300) {
        const { account, rewards: amount } = event.asV1300
        return {
            account,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export const handleRewarded: EventHandler = async (ctx) => {
    const data = getEventData(ctx)
    if (!data) return

    await saveRewardedEvent(ctx, data)
}
