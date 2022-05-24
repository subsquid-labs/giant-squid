import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { isExtrinsicSuccess } from '../../../common/helpers'
import { BondType } from '../../../model'
import storage from '../../../storage'
import { StakingUnbondCall } from '../../../types/generated/calls'
import { saveBond } from '../utils/savers'
import { isAlreadyHandled } from '../utils/tools'

interface CallData {
    amount: bigint
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData {
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

export async function handleUnbond(ctx: ExtrinsicHandlerContext) {
    const success = isExtrinsicSuccess(ctx)

    //in first versions of kusama there aren't event for bonds, so we need to handle them
    const alreadyHandled = isAlreadyHandled(ctx)

    if (alreadyHandled && success) return

    const data = getCallData(ctx)

    const ledger = await storage.staking.ledger.get(ctx, ctx.extrinsic.signer)
    if (!ledger) return

    await saveBond(ctx, {
        account: ledger.stash,
        amount: data.amount,
        success,
        type: BondType.Unbond,
    })
}
