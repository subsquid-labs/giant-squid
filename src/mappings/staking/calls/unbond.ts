import { UnknownVersionError } from '../../../common/errors'
import { getOriginAccountId } from '../../../common/tools'
import { BondType } from '../../../model'
import { StakingUnbondCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { saveBond } from './utils'

interface CallData {
    amount: bigint
}

function getCallData(ctx: CallContext): CallData {
    const call = new StakingUnbondCall(ctx)

    if (call.isV0) {
        const { value } = call.asV0
        return {
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleUnbond(ctx: CallHandlerContext) {
    const data = getCallData(ctx)

    await saveBond(ctx, {
        id: ctx.call.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.extrinsic.hash,
        accountId: getOriginAccountId(ctx.call.origin),
        amount: data.amount,
        type: BondType.Unbond,
        success: ctx.call.success,
    })
}
