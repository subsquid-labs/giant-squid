import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { isExtrinsicSuccess } from '../../../common/helpers'
import { BondType } from '../../../model'
import { StakingBondExtraCall } from '../../../types/generated/calls'
import { saveBond } from '../utils/savers'
import { isAlreadyHandled } from '../utils/tools'

interface CallData {
    amount: bigint
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData {
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

export async function handleBondExtra(ctx: ExtrinsicHandlerContext) {
    const success = isExtrinsicSuccess(ctx)

    //in first versions of kusama there aren't event for bonds, so we need to handle them
    const alreadyHandled = isAlreadyHandled(ctx)

    if (alreadyHandled && success) return

    const data = getCallData(ctx)

    await saveBond(ctx, {
        account: ctx.extrinsic.signer,
        amount: data.amount,
        success,
        type: BondType.Bond,
    })
}
