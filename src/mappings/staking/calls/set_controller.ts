import assert from 'assert'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId, getOriginAccountId, isStorageCorrupted, logCall } from '../../../common/tools'
import {PayeeType} from '../../../model'
import { StakingSetControllerCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { getOrCreateAccount, getOrCreateStaker } from '../../util/entities'

function getCallData(ctx: CallContext): { controller: Uint8Array } | undefined {
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

export async function handleSetController(ctx: CallHandlerContext) {
    logCall(ctx)

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
