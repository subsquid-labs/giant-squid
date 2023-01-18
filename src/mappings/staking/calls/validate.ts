import assert from 'assert'
import { UnknownVersionError } from '../../../common/errors'
import { getOriginAccountId } from '../../../common/tools'
import { StakingRole } from '../../../model'
import storage from '../../../storage'
import { StakingValidateCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { getOrCreateStaker } from '../../util/entities'

interface CallData {
    commission: number
}

function getCallData(ctx: CallContext): CallData {
    const call = new StakingValidateCall(ctx)

    if (call.isV0) {
        const { prefs } = call.asV0
        return {
            commission: prefs.commission,
        }
    } else if (call.isV28) {
        const { prefs } = call.asV28
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

    let stashId = await storage.staking.ledger.get(ctx, controllerId).then(l => l?.stash)
    if (!stashId) return

    const staker = await getOrCreateStaker(ctx, stashId)
    assert(staker != null, `Missing staking info for ${stashId}`)

    staker.role = StakingRole.Validator

    await ctx.store.save(staker)
}
