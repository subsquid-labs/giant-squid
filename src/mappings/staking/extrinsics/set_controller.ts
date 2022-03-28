import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { StakingSetControllerCall } from '../../../types/generated/calls'
import { saveController } from '../utils/saveStakingInfo'

function getCallData(ctx: ExtrinsicHandlerContext): { controller: Uint8Array } {
    const call = new StakingSetControllerCall(ctx)

    if (call.isV13) {
        return call.asV13
    } else {
        return call.asLatest
    }
}

export async function handleSetController(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await saveController(ctx, data)
}
