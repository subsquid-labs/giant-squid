import assert from 'assert'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId, getOriginAccountId } from '../../../common/helpers'
import { accountManager } from '../../../managers'
import { Staker } from '../../../model'
import { StakingSetControllerCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'

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
    const data = getCallData(ctx)
    if (!data) return

    const accountId = getOriginAccountId(ctx.call.origin)

    const staker = await ctx.store.get(Staker, {
        where: {
            stashId: accountId,
        },
    })
    assert(staker != null, `Missing staking info for ${accountId}`)

    staker.controller = await accountManager.get(ctx, encodeId(data.controller))

    await ctx.store.save(staker)
}
