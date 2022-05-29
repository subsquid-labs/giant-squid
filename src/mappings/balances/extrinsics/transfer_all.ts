import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { saveTransfer } from '../utils/save'
import { BalancesTransferAllCall } from '../../../types/generated/calls'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId, isAdressSS58 } from '../../../common/helpers'

interface EventData {
    to: Uint8Array
}

function getCallData(ctx: ExtrinsicHandlerContext): EventData {
    const call = new BalancesTransferAllCall(ctx)
    if (call.isV2000) {
        const { dest } = call.asV2000
        return {
            to: dest.value as Uint8Array,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleTransferAll(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await saveTransfer(ctx, {
        from: ctx.extrinsic.signer,
        to: isAdressSS58(data.to) ? encodeId(data.to) : null,
        amount: 0n,
    })
}
