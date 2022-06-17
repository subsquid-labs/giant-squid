import { UnknownVersionError } from '../../../common/errors'
import { getOriginAccountId } from '../../../common/tools'
import { BondType } from '../../../model'
import { StakingBondExtraCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { saveBond } from './utils'

interface CallData {
    amount: bigint
}

function getCallData(ctx: CallContext): CallData {
    const call = new StakingBondExtraCall(ctx)

    if (call.isV13) {
        const { maxAdditional } = call.asV13
        return {
            amount: maxAdditional,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleBondExtra(ctx: CallHandlerContext) {
    if (!ctx.call.success) return

    const data = getCallData(ctx)

    await saveBond(ctx, {
        id: ctx.call.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.extrinsic.hash,
        accountId: getOriginAccountId(ctx.call.origin),
        amount: data.amount,
        type: BondType.Bond,
        success: ctx.call.success,
    })
}
