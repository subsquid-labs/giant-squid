import { BalancesForceTransferCall } from '../../../types/calls'
import { encodeId, isAdressSS58 } from '../../../common/helpers'
import { UnknownVersionError } from '../../../common/errors'
import { saveTransfer } from '../../util/entities'
import { TransferType } from '../../../model'
import { Store } from '@subsquid/typeorm-store'
import { CallHandlerContext } from '@subsquid/substrate-processor'

interface EventData {
    from: Uint8Array
    to: Uint8Array
    amount: bigint
}

function getCallData(ctx: CallHandlerContext<Store>): EventData {
    const call = new BalancesForceTransferCall(ctx)
   if (call.isV1) {
        const { source, dest, value } = call.asV1
        return {
            from: source.value as Uint8Array,
            to: dest.value as Uint8Array,
            amount: value,
        }
    } 
    ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
    try {
        const { source, dest, value } = ctx._chain.decodeCall(ctx.call)
        return {
            from: source.value as Uint8Array,
            to: dest.value as Uint8Array,
            amount: value,
        }
    }
    catch {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleForceTransfer(ctx: CallHandlerContext<Store>) {
    const data = getCallData(ctx)
    if (!data) return

    await saveTransfer(ctx, {
        id: ctx.call.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.extrinsic.hash,
        fromId: encodeId(data.from),
        toId: isAdressSS58(data.to) ? encodeId(data.to) : null,
        amount: data.amount,
        success: ctx.call.success,
        type: TransferType.Native,
    })
}
