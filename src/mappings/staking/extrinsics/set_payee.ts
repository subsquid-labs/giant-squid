import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'

import { PayeeCallData, PayeeType } from '../../../types/custom/stakingData'
import { StakingSetPayeeCall } from '../../../types/generated/calls'
import { savePayee } from '../utils/saveStakingInfo'

function getCallData(ctx: ExtrinsicHandlerContext): PayeeCallData {
    const call = new StakingSetPayeeCall(ctx)

    if (call.isV13) {
        const { payee } = call.asV13
        return {
            payee: payee.__kind as PayeeType,
            account: payee.value,
        }
    } else {
        const { payee } = call.asLatest
        return {
            payee: payee.__kind as PayeeType,
            account: payee.value,
        }
    }
}

export async function handleSetPayee(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await savePayee(ctx, data)
}
