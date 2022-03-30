import { EventHandlerContext } from '@subsquid/substrate-processor'
import { StakeData } from '../../../types/custom/stakingData'
import { DappsStakingBondAndStakeEvent } from '../../../types/generated/events'
import { saveStakeEvent } from '../utils/base'

function getEventData(ctx: EventHandlerContext): StakeData {
    const event = new DappsStakingBondAndStakeEvent(ctx)

    if (event.isV4) {
        const [account, smartContract, amount] = event.asV4
        return {
            account,
            amount,
            smartContract: smartContract.value,
        }
    } else {
        const [account, smartContract, amount] = event.asLatest
        return {
            account,
            amount,
            smartContract: smartContract.value,
        }
    }
}

export async function handleBonded(ctx: EventHandlerContext) {
    const data = getEventData(ctx)
    if (!data) return

    await saveStakeEvent(ctx, data)
}
