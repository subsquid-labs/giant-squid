import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { StakingSetControllerCall } from '../../../types/generated/calls'
import { saveController } from '../utils/savers'

function getCallData(ctx: ExtrinsicHandlerContext): { controller: Uint8Array } | undefined {
    const call = new StakingSetControllerCall(ctx)

    if (call.isV0) {
        return call.asV0
    } else if (call.isV28) {
        const { controller } = call.asV28
        return { controller: controller.value as Uint8Array }
    } else if (call.isV9110) {
        const { controller } = call.asV9110
        return { controller: controller.value as Uint8Array }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleSetController(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    await saveController(ctx, data)
}
