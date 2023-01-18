import { UnknownVersionError } from '../../../common/errors'
import { getOriginAccountId, logCall } from '../../../common/tools'
import { BondType } from '../../../model'
import { StakingUnbondCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { saveBond } from './utils'

interface CallData {
    amount: bigint
}

function getCallData(ctx: CallContext): CallData {
    const call = new StakingUnbondCall(ctx)

    if (call.isV1020) {
        const { value } = call.asV1020
        return {
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleUnbond(ctx: CallHandlerContext) {
    logCall(ctx)

    if (!ctx.call.success) return

    const data = getCallData(ctx)

    const accountId = getOriginAccountId(ctx.call.origin)
    if (!accountId) return

    await saveBond(ctx, {
        id: ctx.call.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.extrinsic.hash,
        accountId,
        amount: data.amount,
        type: BondType.Unbond,
        success: ctx.call.success,
    })
}
