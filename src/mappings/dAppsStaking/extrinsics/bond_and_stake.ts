import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeEvm, isExtrinsicSuccess } from '../../../common/helpers'
import { BondType } from '../../../model'
import { DappsStakingBondAndStakeCall } from '../../../types/generated/calls'
import { saveBond } from '../utils/savers'

interface CallData {
    amount: bigint
    smartContract: Uint8Array
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData {
    const call = new DappsStakingBondAndStakeCall(ctx)

    if (call.isV4) {
        const { contractId, value } = call.asV4
        return {
            amount: value,
            smartContract: contractId.value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleBond(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveBond(ctx, {
        account: ctx.extrinsic.signer,
        amount: data.amount,
        type: BondType.Bond,
        smartContract: encodeEvm(data.smartContract),
        success: isExtrinsicSuccess(ctx),
    })
}
