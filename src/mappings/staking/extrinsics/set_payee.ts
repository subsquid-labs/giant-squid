import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'

import { PayeeCallData, PayeeType } from '../../../types/custom/stakingData'
import { StakingSetPayeeCall } from '../../../types/generated/calls'
import { savePayee } from '../utils/saveStakingInfo'

function getCallData(ctx: ExtrinsicHandlerContext): PayeeCallData {
    const call = new StakingSetPayeeCall(ctx)

    if (call.isV0) {
        const { payee } = call.asV0
        return {
            payee: payee.__kind as PayeeType,
            account: payee.value,
        }
    } else if (call.isV9110) {
        const { payee } = call.asV9110
        return {
            payee: payee.__kind as PayeeType,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            account: (payee as any).value,
        }
    } else {
        const { payee } = call.asLatest
        return {
            payee: payee.__kind as PayeeType,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            account: (payee as any).value,
        }
    }
}

export async function handleSetPayee(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await savePayee(ctx, data)
}
