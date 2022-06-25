import assert from 'assert'
import { UnknownVersionError } from '../../../common/errors'
import { getOriginAccountId } from '../../../common/tools'
import { StakingRole } from '../../../model'
import { StakingNominateCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { getOrCreateStaker } from '../../util/entities'

interface CallData {
    targets: Uint8Array[]
}

function getCallData(ctx: CallContext): CallData | undefined {
    const call = new StakingNominateCall(ctx)

    if (call.isV0) {
        return call.asV0
    } else if (call.isV28) {
        const { targets } = call.asV28
        return {
            targets: targets.map((t) => t.value as Uint8Array),
        }
    } else if (call.isV9110) {
        const { targets } = call.asV9110
        return {
            targets: targets.map((t) => t.value as Uint8Array),
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleNominate(ctx: CallHandlerContext) {
    if (!ctx.call.success) return

    const data = getCallData(ctx)

    const controllerId = getOriginAccountId(ctx.call.origin)
    if (!controllerId) return

    const staker = await getOrCreateStaker(ctx, 'Controller', controllerId)
    assert(staker != null, `Missing staking info for ${controllerId}`)

    staker.role = StakingRole.Nominator
    staker.commission = null

    await ctx.store.save(staker)
}
