import { NATIVE_TOKEN } from '../../../common/consts'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId, getOriginAccountId, isAdressSS58 } from '../../../common/tools'
import { TransferType } from '../../../model'
import { BalancesTransferCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { saveTransfer } from '../../util/entities'

interface EventData {
    to: Uint8Array
    amount: bigint
}

function getCallData(ctx: CallContext): EventData | undefined {
    const call = new BalancesTransferCall(ctx)
    if (call.isV2000) {
        const { dest, value } = call.asV2000
        return {
            to: dest.value as Uint8Array,
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleTransfer(ctx: CallHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    const accountId = getOriginAccountId(ctx.call.origin)
    if (!accountId) return

    await saveTransfer(ctx, {
        id: ctx.call.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.extrinsic.hash,
        fromId: accountId,
        toId: isAdressSS58(data.to) ? encodeId(data.to) : null,
        asset: {
            amount: data.amount,
            symbol: NATIVE_TOKEN,
        },
        success: ctx.call.success,
        type: TransferType.Native,
    })
}