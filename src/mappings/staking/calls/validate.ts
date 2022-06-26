import assert from 'assert'
import { UnknownVersionError } from '../../../common/errors'
import { getOriginAccountId, isStorageCorrupted } from '../../../common/tools'
import { StakingRole } from '../../../model'
import { StakingValidateCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { getOrCreateStaker } from '../../util/entities'

interface CallData {
    commission: number
}

function getCallData(ctx: CallContext): CallData {
    const call = new StakingValidateCall(ctx)

    if (call.isV1020) {
        const { prefs } = call.asV1020
        return {
            commission: prefs.commission,
        }
    } else if (call.isV2028) {
        const { prefs } = call.asV2028
        return {
            commission: prefs.commission,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleValidate(ctx: CallHandlerContext) {
    if (!ctx.call.success) return

    const data = getCallData(ctx)

    const controllerId = getOriginAccountId(ctx.call.origin)
    if (!controllerId) return

    const staker = await getOrCreateStaker(ctx, 'Controller', controllerId)
    if (!staker && isStorageCorrupted(ctx)) return
    assert(staker != null, `Missing staking info for ${controllerId}`)

    staker.role = StakingRole.Validator
    staker.commission = data?.commission

    await ctx.store.save(staker)
}
