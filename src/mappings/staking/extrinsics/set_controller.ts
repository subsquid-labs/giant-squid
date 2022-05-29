import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import { accountManager, stakingInfoManager } from '../../../managers'
import { StakingSetControllerCall } from '../../../types/generated/calls'

function getCallData(ctx: ExtrinsicHandlerContext): { controller: Uint8Array } | undefined {
    const call = new StakingSetControllerCall(ctx)

    if (call.isV13) {
        return call.asV13
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleSetController(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    const stash = ctx.extrinsic.signer

    const stakingInfo = await stakingInfoManager.get(ctx, stash)
    if (!stakingInfo) return

    const controller = encodeId(data.controller)
    if (!controller) return

    stakingInfo.controller = await accountManager.get(ctx, controller)

    await stakingInfoManager.update(ctx, stakingInfo)
}
