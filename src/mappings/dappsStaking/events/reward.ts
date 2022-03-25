import { EventHandlerContext } from '@subsquid/substrate-processor'
import { RewardData } from '../../../types/custom/stakingData'
import { DappsStakingRewardEvent } from '../../../types/generated/events'
import { saveRewardEvent } from '../utils/base'

function getEventData(ctx: EventHandlerContext): RewardData {
    const event = new DappsStakingRewardEvent(ctx)

    if (event.isV22) {
        const [account, smartContract, era, amount] = event.asV22
        return {
            account,
            amount,
            era,
            smartConstract: smartContract.value,
        }
    } else {
        const [account, smartContract, era, amount] = event.asLatest
        return {
            account,
            amount,
            era,
            smartConstract: smartContract.value,
        }
    }
}

export async function handleReward(ctx: EventHandlerContext) {
    const data = getEventData(ctx)
    if (!data) return

    await saveRewardEvent(ctx, data)
}
