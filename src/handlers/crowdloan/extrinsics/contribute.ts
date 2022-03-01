import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { ContributionData } from '../../../common/types/crowdloanData'
import { CrowdloanContributeCall } from '../../../types/calls'
import { saveContributeCall } from '../base'

function getCallData(ctx: ExtrinsicHandlerContext): ContributionData {
    const call = new CrowdloanContributeCall(ctx)
    if (call.isV9010) {
        const { index, value } = call.asV9010
        return {
            paraId: index,
            amount: value,
        }
    } else {
        const { index, value } = call.asLatest
        return {
            paraId: index,
            amount: value,
        }
    }
}

export async function handleContribute(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await saveContributeCall(ctx, data)
}
