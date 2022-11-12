import { CallHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId, getOriginAccountId, isAdressSS58 } from '../../../common/helpers'
import { TransferType } from '../../../model'
import { BalancesTransferKeepAliveCall } from '../../../types/calls'
import { saveTransfer } from '../../util/entities'

interface EventData {
    to: Uint8Array
    amount: bigint
}

function getCallData(ctx: CallHandlerContext<Store>): EventData {
    const call = new BalancesTransferKeepAliveCall(ctx)
    if (call.isV1) {
        const { dest, value } = call.asV1
        return {
            to: dest.value as Uint8Array,
            amount: value,
        }
    }
    ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
    try {
        const { dest, value } = ctx._chain.decodeCall(ctx.call)
        return {
            to: dest.value as Uint8Array,
            amount: value,
        }
    }
    catch {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleTransferKeepAlive(ctx: CallHandlerContext<Store>) {
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
        amount: data.amount,
        success: ctx.call.success,
        type: TransferType.Native,
    })
}
