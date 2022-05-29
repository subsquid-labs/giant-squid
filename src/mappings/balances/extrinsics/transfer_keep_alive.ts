import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId, isAdressSS58 } from '../../../common/helpers'
import { BalancesTransferKeepAliveCall } from '../../../types/generated/calls'
import { saveTransfer } from '../utils/saver'

interface EventData {
    to: Uint8Array
    amount: bigint
}

function getCallData(ctx: ExtrinsicHandlerContext): EventData | undefined {
    const call = new BalancesTransferKeepAliveCall(ctx)

    if (call.isV13) {
        const { dest, value } = call.asV13
        return {
            to: dest as Uint8Array,
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleTransferKeepAlive(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveTransfer(ctx, {
        from: ctx.extrinsic.signer,
        to: isAdressSS58(data.to) ? encodeId(data.to) : null,
        amount: data.amount,
    })
}
