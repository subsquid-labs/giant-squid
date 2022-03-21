import { EventHandlerContext } from '@subsquid/substrate-processor'
import { StakeData } from '../../../types/custom/stakingData'
import { DappsStakingUnbondUnstakeAndWithdrawEvent } from '../../../types/generated/events'
import { saveStakeEvent } from '../utils/base'

function getEventData(ctx: EventHandlerContext): StakeData {
    const event = new DappsStakingUnbondUnstakeAndWithdrawEvent(ctx)

    if (event.isV4) {
        const [account, contract, amount] = event.asV4
        return {
            account,
            smartConstract: contract.value,
            amount,
        }
    } else {
        const [account, contract, amount] = event.asLatest
        return {
            account,
            smartConstract: contract.value,
            amount,
        }
    }
}

export async function handleUnbonded(ctx: EventHandlerContext) {
    const data = getEventData(ctx)
    if (!data) return

    await saveStakeEvent(ctx, data)
}
