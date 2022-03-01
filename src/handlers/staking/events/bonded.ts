import { EventHandlerContext } from '@subsquid/substrate-processor'
import { StakeData } from '../../../common/types/stakingData'
import { StakingBondedEvent } from '../../../types/events'
import { saveStakeEvent } from '../utils/base'

function getEventData(ctx: EventHandlerContext): StakeData {
    const event = new StakingBondedEvent(ctx)

    if (event.isV1051) {
        const [account, amount] = event.asV1051
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

export async function handleBonded(ctx: EventHandlerContext) {
    const data = getEventData(ctx)
    if (!data) return

    await saveStakeEvent(ctx, data)
}
