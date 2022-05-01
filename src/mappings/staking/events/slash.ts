import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { RewardData } from '../../../types/custom/stakingData'
import { StakingSlashedEvent, StakingSlashEvent } from '../../../types/generated/events'
import { saveSlashEvent } from '../utils/base'

function getSlashEventData(ctx: EventHandlerContext): RewardData {
    const event = new StakingSlashEvent(ctx)

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

function getSlashedEventData(ctx: EventHandlerContext): RewardData {
    const event = new StakingSlashedEvent(ctx)

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

export async function handleSlashed(ctx: EventHandlerContext, old = false) {
    const data = old ? getSlashEventData(ctx) : getSlashedEventData(ctx)
    await saveSlashEvent(ctx, data)
}

export const handleSlash = (ctx: EventHandlerContext) => handleSlashed(ctx, true)
