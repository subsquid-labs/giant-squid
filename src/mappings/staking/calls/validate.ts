import assert from 'assert'
import { UnknownVersionError } from '../../../common/errors'
import { getOriginAccountId } from '../../../common/helpers'
import { Staker, StakingRole } from '../../../model'
import storage from '../../../storage'
import { StakingValidateCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'

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
    const data = getCallData(ctx)

    const accountId = getOriginAccountId(ctx.call.origin)

    const staker = await ctx.store.get(Staker, {
        where: {
            controllerId: accountId,
        },
    })
    assert(staker != null, `Missing staking info for ${accountId}`)

    staker.role = StakingRole.Validator
    staker.commission = data?.commission

    await ctx.store.save(staker)
}
