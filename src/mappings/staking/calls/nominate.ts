import assert from 'assert'
import { UnknownVersionError } from '../../../common/errors'
import { getOriginAccountId, isStorageCorrupted } from '../../../common/tools'
import { StakingRole } from '../../../model'
import { StakingNominateCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { getOrCreateStaker } from '../../util/entities'

interface CallData {
    targets: Uint8Array[]
}

function getCallData(ctx: CallContext): CallData | undefined {
    const call = new StakingNominateCall(ctx)

    if (call.isV1020) {
        const { targets } = call.asV1020
        return {
            targets: targets
                .filter((t): t is { __kind: 'AccountId'; value: Uint8Array } => t.__kind === 'AccountId')
                .map((t) => t.value),
        }
    } else if (call.isV1050) {
        return call.asV1050
    } else if (call.isV2028) {
        const { targets } = call.asV2028
        return {
            targets: targets.map((t) => t.value as Uint8Array),
        }
    } else if (call.isV9111) {
        const { targets } = call.asV9111
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
    if (!staker && isStorageCorrupted(ctx)) return
    assert(staker != null, `Missing staking info for ${controllerId}`)

    staker.role = StakingRole.Nominator
    staker.commission = null

    await ctx.store.save(staker)
}
