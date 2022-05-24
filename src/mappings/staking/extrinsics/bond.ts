import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { isExtrinsicSuccess } from '../../../common/helpers'
import { BondType } from '../../../model'
import { StakingBondCall } from '../../../types/generated/calls'
import { saveBond } from '../utils/savers'
import { isAlreadyHandled } from '../utils/tools'

interface CallData {
    amount: bigint
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData | undefined {
    const call = new StakingBondCall(ctx)

    if (call.isV0) {
        return {
            amount: call.asV0.value,
        }
    } else if (call.isV28) {
        const { value } = call.asV28
        return {
            amount: value,
        }
    } else if (call.isV9110) {
        const { value } = call.asV9110
        return {
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleBond(ctx: ExtrinsicHandlerContext) {
    const success = isExtrinsicSuccess(ctx)

    //in first versions of kusama there aren't event for bonds, so we need to handle them
    const alreadyHandled = isAlreadyHandled(ctx)

    if (alreadyHandled && success) return

    const data = getCallData(ctx)
    if (!data) return

    await saveBond(ctx, {
        account: ctx.extrinsic.signer,
        amount: data.amount,
        success,
        type: BondType.Bond,
    })
}
