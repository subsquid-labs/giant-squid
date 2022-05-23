import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { StakingSetControllerCall } from '../../../types/generated/calls'
import { saveController } from '../utils/savers'

function getCallData(ctx: ExtrinsicHandlerContext): { controller: Uint8Array } | undefined {
    const call = new StakingSetControllerCall(ctx)

    if (call.isV1020) {
        return undefined
    } else if (call.isV1050) {
        return call.asV1050
    } else if (call.isV2028) {
        const { controller } = call.asV2028
        return { controller: controller.value as Uint8Array }
    } else if (call.isV9111) {
        const { controller } = call.asV9111
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
