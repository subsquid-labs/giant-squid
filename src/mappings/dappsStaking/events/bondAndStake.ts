import { EventHandlerContext } from '@subsquid/substrate-processor'
import { StakeData } from '../../../types/custom/stakingData'
import { DappsStakingBondAndStakeEvent } from '../../../types/generated/events'
import { saveStakeEvent } from '../utils/base'

function getEventData(ctx: EventHandlerContext): StakeData {
    const event = new DappsStakingBondAndStakeEvent(ctx)

    if (event.isV4) {
        const [account, smartConstract, amount] = event.asV4
        return {
            account,
            smartConstract: smartConstract.value,
            amount,
        }
    } else {
        const [account, smartConstract, amount] = event.asLatest
        return {
            account,
            smartConstract: smartConstract.value,
            amount,
        }
    }
}

export async function handleBonded(ctx: EventHandlerContext) {
    const data = getEventData(ctx)
    if (!data) return

    await saveStakeEvent(ctx, data)
}
