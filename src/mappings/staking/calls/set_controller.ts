import assert from 'assert'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId, getOriginAccountId } from '../../../common/tools'
import { StakingSetControllerCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { getOrCreateAccount, getOrCreateStaker } from '../../util/entities'

function getCallData(ctx: CallContext): { controller: Uint8Array } | undefined {
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

export async function handleSetController(ctx: CallHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    const stashId = getOriginAccountId(ctx.call.origin)

    const staker = await getOrCreateStaker(ctx, 'Stash', stashId)
    assert(staker != null, `Missing staking info for ${stashId}`)

    staker.controller = await getOrCreateAccount(ctx, encodeId(data.controller))

    await ctx.store.save(staker)
}
