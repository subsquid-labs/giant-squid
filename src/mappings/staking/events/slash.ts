import { EventHandlerContext } from '@subsquid/substrate-processor'
import { RewardData } from '../../../types/custom/stakingData'
import { StakingSlashEvent } from '../../../types/generated/events'
import { saveSlashEvent } from '../utils/base'

function getEventData(ctx: EventHandlerContext): RewardData {
    const event = new StakingSlashEvent(ctx)

    if (event.isV13) {
        const [account, amount] = event.asV13
        return {
            account,
            amount,
        }
    } else {
        const [account, amount] = event.asLatest
        return {
            account,
            amount,
        }
    }
}

export async function handleSlash(ctx: EventHandlerContext) {
    const data = getEventData(ctx)
    await saveSlashEvent(ctx, data)
}
