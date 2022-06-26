import { BalancesForceTransferCall } from '../../../types/generated/calls'
import { encodeId, isAdressSS58 } from '../../../common/tools'
import { UnknownVersionError } from '../../../common/errors'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { saveTransfer } from '../../util/entities'
import { TransferType } from '../../../model'
import { NATIVE_TOKEN } from '../../../common/consts'

interface EventData {
    from: Uint8Array
    to: Uint8Array
    amount: bigint
}

function getCallData(ctx: CallContext): EventData | undefined {
    const call = new BalancesForceTransferCall(ctx)
    if (call.isV2000) {
        const { source, dest, value } = call.asV2000
        return {
            from: source.value as Uint8Array,
            to: dest.value as Uint8Array,
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleForceTransfer(ctx: CallHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveTransfer(ctx, {
        id: ctx.call.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.extrinsic.hash,
        fromId: encodeId(data.from),
        toId: isAdressSS58(data.to) ? encodeId(data.to) : null,
        asset: {
            amount: data.amount,
            symbol: NATIVE_TOKEN,
        },
        success: ctx.call.success,
        type: TransferType.Native,
    })
}
