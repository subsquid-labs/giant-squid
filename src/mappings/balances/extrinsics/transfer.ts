import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { TransferData } from '../../../types/custom/balanceData'
import { BalancesTransferCall } from '../../../types/generated/calls'
import { saveTransferCall } from '../utils/base'

function getCallData(ctx: ExtrinsicHandlerContext): TransferData | undefined {
    const call = new BalancesTransferCall(ctx)
    if (call.isV900) {
        const { dest, value } = call.asV900
        return {
            to: dest as Uint8Array,
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleTransfer(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveTransferCall(ctx, data)
}
