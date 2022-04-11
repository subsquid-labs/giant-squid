import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { saveTransferCall } from '../utils/base'
import { TransferData } from '../../../types/custom/balanceData'
import { BalancesForceTransferCall } from '../../../types/generated/calls'
import { UnknownVersionError } from '../../../common/errors'

function getCallData(ctx: ExtrinsicHandlerContext): TransferData | undefined {
    const call = new BalancesForceTransferCall(ctx)
    if (call.isV49) {
        const { source, dest, value } = call.asV49
        return {
            from: source as Uint8Array,
            to: dest as Uint8Array,
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleForceTransfer(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveTransferCall(ctx, data)
}
