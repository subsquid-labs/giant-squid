import assert from 'assert'
import { UnknownVersionError } from '../../../common/errors'
import { getOriginAccountId } from '../../../common/helpers'
import { Staker, StakingRole } from '../../../model'
import { StakingNominateCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'

interface CallData {
    targets: Uint8Array[]
}

function getCallData(ctx: CallContext): CallData | undefined {
    const call = new StakingNominateCall(ctx)

    if (call.isV1020) {
        const { targets } = call.asV1020
        return {
            targets: targets.map((t) => {
                assert(t.__kind === 'AccountId')
                return t.value
            }),
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
    const data = getCallData(ctx)

    const accountId = getOriginAccountId(ctx.call.origin)

    const staker = await ctx.store.get(Staker, {
        where: {
            controllerId: accountId,
        },
    })
    assert(staker != null, `Missing staking info for ${accountId}`)

    staker.role = StakingRole.Nominator
    staker.commission = null

    await ctx.store.save(staker)
}
