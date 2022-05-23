import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'

import { PayeeCallData, PayeeTypeRaw } from '../../../types/custom/stakingData'
import { StakingSetPayeeCall } from '../../../types/generated/calls'
import { savePayee } from '../utils/savers'

function getCallData(ctx: ExtrinsicHandlerContext): PayeeCallData {
    const call = new StakingSetPayeeCall(ctx)

    if (call.isV1020) {
        const { payee } = call.asV1020
        return {
            payee: payee.__kind as PayeeTypeRaw,
            account: (payee as { value: Uint8Array }).value,
        }
    } else if (call.isV9111) {
        const { payee } = call.asV9111
        return {
            payee: payee.__kind as PayeeTypeRaw,
            account: (payee as { value: Uint8Array }).value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleSetPayee(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await savePayee(ctx, data)
}
