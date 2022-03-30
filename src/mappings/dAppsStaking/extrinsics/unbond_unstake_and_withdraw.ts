import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { StakeData } from '../../../types/custom/stakingData'
import { DappsStakingUnbondUnstakeAndWithdrawEvent } from '../../../types/generated/events'
import { saveStakeCall } from '../utils/base'

function getCallData(ctx: ExtrinsicHandlerContext): StakeData {
    const call = new DappsStakingUnbondUnstakeAndWithdrawEvent(ctx)

    if (call.isV4) {
        const [account, smartContract, value] = call.asV4
        return {
            amount: value,
            account,
            smartContract: smartContract.value,
        }
    } else {
        const [account, smartContract, value] = call.asLatest
        return {
            amount: value,
            account,
            smartContract: smartContract.value,
        }
    }
}

export async function handleUnbond(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await saveStakeCall(ctx, data)
}
