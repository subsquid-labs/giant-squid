import { EventHandlerContext } from '@subsquid/substrate-processor'
import { RewardData } from '../../../types/custom/stakingData'
import { DappsStakingRewardEvent } from '../../../types/generated/events'
import { saveRewardEvent } from '../utils/base'

function getEventData(ctx: EventHandlerContext): RewardData | undefined {
    const event = new DappsStakingRewardEvent(ctx)

    if (event.isV4) {
        const [account, smartContract, era, amount] = event.asV4
        return {
            account,
            amount,
            smartContract: smartContract.value,
            era,
        }
    } else {
        const [account, smartContract, era, amount] = event.asLatest
        return {
            account,
            amount,
            smartContract: smartContract.value,
            era,
        }
    }
}

export async function handleReward(ctx: EventHandlerContext) {
    const data = getEventData(ctx)
    if (!data) return

    await saveRewardEvent(ctx, data)
}
