import { EventHandlerContext } from '@subsquid/substrate-processor'
import { RewardData } from '../../../types/custom/stakingData'
import { StakingSlashedEvent, StakingSlashEvent } from '../../../types/generated/events'
import { saveSlashEvent } from '../utils/base'

function getSlashedEvent(ctx: EventHandlerContext): RewardData {
    const event = new StakingSlashedEvent(ctx)

    if (event.isV9090) {
        const [account, amount] = event.asV9090
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

function getSlashEvent(ctx: EventHandlerContext): RewardData {
    const event = new StakingSlashEvent(ctx)

    if (event.isV0) {
        const [account, amount] = event.asV0
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

export async function handleSlashed(ctx: EventHandlerContext, old = false) {
    const data = old ? getSlashEvent(ctx) : getSlashedEvent(ctx)
    await saveSlashEvent(ctx, data)
}

export const handleSlash = (ctx: EventHandlerContext) => {
    return handleSlashed(ctx, true)
}
