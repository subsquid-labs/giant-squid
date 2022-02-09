import * as events from '../../../types/events'

import { EventHandlerContext } from '@subsquid/substrate-processor'
import { RewardData } from '../../../common/types/stakingData'
import { saveRewardEvent } from './base'

function getSlashedEvent(ctx: EventHandlerContext, old = false): RewardData {
    const event = new events.StakingSlashedEvent(ctx)

    const [account, amount] = event.asLatest
    return {
        account,
        amount,
    }
}

function getSlashEvent(ctx: EventHandlerContext): RewardData {
    const event = new events.StakingSlashEvent(ctx)

    const [account, amount] = event.asLatest
    return {
        account,
        amount,
    }
}

const saveSlashEvent = saveRewardEvent

export async function handleSlashed(ctx: EventHandlerContext, old = false) {
    const data = old ? getSlashEvent(ctx) : getSlashedEvent(ctx)
    await saveSlashEvent(ctx, data)
}

export const handleSlash = (ctx: EventHandlerContext) => {
    return handleSlashed(ctx, true)
}
