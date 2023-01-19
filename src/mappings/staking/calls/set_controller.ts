import assert from 'assert'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId, getOriginAccountId, logCall } from '../../../common/tools'
import {PayeeType} from '../../../model'
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
    if (!ctx.call.success) return

    const data = getCallData(ctx)
    if (!data) return

    const stashId = getOriginAccountId(ctx.call.origin)
    if (!stashId) return

    const staker = await getOrCreateStaker(ctx, stashId)
    assert(staker != null, `Missing staking info for ${stashId}`)

    staker.controller = await getOrCreateAccount(ctx, encodeId(data.controller))
    if (staker.payeeType === PayeeType.Controller) {
        staker.payee = staker.controller
    }

    await ctx.store.save(staker)
}
