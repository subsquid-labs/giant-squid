import { BalancesTransferAllCall } from '../../../types/calls'
import { encodeId, getOriginAccountId, isAdressSS58 } from '../../../common/helpers'
import { UnknownVersionError } from '../../../common/errors'
import { saveTransfer } from '../../util/entities'
import { TransferType } from '../../../model'
import { CallHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'

interface EventData {
    to: Uint8Array
}

function getCallData(ctx: CallHandlerContext<Store>): EventData {
    const call = new BalancesTransferAllCall(ctx)
    if (call.isV1) {
        const { dest } = call.asV1
        return {
            to: dest.value as Uint8Array,
        }
    }
    ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
    try {
        const { dest } = ctx._chain.decodeCall(ctx.call)
        return {
            to: dest.value as Uint8Array,
        }
    }
    catch {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleTransferAll(ctx: CallHandlerContext<Store>) {
    const data = getCallData(ctx)
    const accountId = getOriginAccountId(ctx.call.origin)
    if (!accountId) return

    await saveTransfer(ctx, {
        id: ctx.call.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.extrinsic.hash,
        fromId: accountId,
        toId: isAdressSS58(data.to) ? encodeId(data.to) : null,
        amount: 0n,
        success: ctx.call.success,
        type: TransferType.Native,
    })
}
