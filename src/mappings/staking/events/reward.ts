import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { RewardData } from '../../../types/custom/stakingData'
import { StakingRewardEvent } from '../../../types/generated/events'
import { saveRewardEvent } from '../utils/base'

function getEventData(ctx: EventHandlerContext): RewardData | undefined {
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

export async function handleReward(ctx: EventHandlerContext) {
    const data = getEventData(ctx)
    if (!data) return

    await saveRewardEvent(ctx, data)
}
