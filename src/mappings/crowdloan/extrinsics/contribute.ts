import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { ContributionData } from '../../../types/custom/crowdloanData'
import { CrowdloanContributeCall } from '../../../types/generated/calls'
import { saveContributeCall } from '../utils/base'

function getCallData(ctx: ExtrinsicHandlerContext): ContributionData {
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
    const data = getCallData(ctx)

    await saveContributeCall(ctx, data)
}
