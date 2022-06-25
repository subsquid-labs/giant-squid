import assert from 'assert'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId, getOriginAccountId } from '../../../common/tools'
import { StakingSetControllerCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { getOrCreateAccount, getOrCreateStaker } from '../../util/entities'

function getCallData(ctx: CallContext): { controller: Uint8Array } | undefined {
    const call = new StakingSetControllerCall(ctx)

    if (call.isV13) {
        return call.asV13
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleSetController(ctx: CallHandlerContext) {
    if (!ctx.call.success) return

    const data = getCallData(ctx)
    if (!data) return

    const stashId = getOriginAccountId(ctx.call.origin)
    if (!stashId) return

    const staker = await getOrCreateStaker(ctx, 'Stash', stashId)
    assert(staker != null, `Missing staking info for ${stashId}`)

    staker.controller = await getOrCreateAccount(ctx, encodeId(data.controller))

    await ctx.store.save(staker)
}
