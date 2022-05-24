import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { isExtrinsicSuccess } from '../../../common/helpers'
import { CrowdloanContributeCall } from '../../../types/generated/calls'
import { saveContribution } from '../utils/saver'

export interface CallData {
    paraId: number
    amount: bigint
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData {
    const call = new CrowdloanContributeCall(ctx)
    if (call.isV9110) {
        const { index, value } = call.asV9110
        return {
            paraId: index,
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleContribute(ctx: ExtrinsicHandlerContext) {
    if (isExtrinsicSuccess(ctx)) return

    const data = getCallData(ctx)

    await saveContribution(ctx, {
        account: ctx.extrinsic.signer,
        amount: data.amount,
        paraId: data.paraId,
        success: false,
    })
}
