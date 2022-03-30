import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { StakeData } from '../../../types/custom/stakingData'
import { DappsStakingBondAndStakeEvent } from '../../../types/generated/events'
import { saveStakeCall } from '../utils/base'

function getCallData(ctx: ExtrinsicHandlerContext): StakeData | undefined {
    const call = new DappsStakingBondAndStakeEvent(ctx)

    if (call.isV4) {
        const [account, smartContract, value] = call.asV4
        return {
            amount: value,
            account: account,
            smartContract: smartContract.value,
        }
    } else {
        const [account, smartContract, value] = call.asLatest
        return {
            amount: value,
            account: account,
            smartContract: smartContract.value,
        }
    }
}

export async function handleBond(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveStakeCall(ctx, data)
}
