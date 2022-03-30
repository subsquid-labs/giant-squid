import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { StakingSetControllerCall } from '../../../types/generated/calls'
import { saveController } from '../utils/saveStakingInfo'

function getCallData(ctx: ExtrinsicHandlerContext): { controller: Uint8Array } {
    const call = new StakingSetControllerCall(ctx)

    if (call.isV0) {
        return call.asV0
    } else if (call.isV28) {
        const { controller } = call.asV28
        return {
            controller: controller.value as Uint8Array,
        }
    } else {
        const { controller } = call.asLatest
        return {
            controller: controller.value as Uint8Array,
        }
    }
}

export async function handleSetController(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await saveController(ctx, data)
}
