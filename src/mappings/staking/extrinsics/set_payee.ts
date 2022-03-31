import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'

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
    } else if (call.isV29) {
        const { payee } = call.asV29
        return {
            payee: payee.__kind as PayeeType,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            account: (payee as any).value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleSetPayee(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await savePayee(ctx, data)
}
