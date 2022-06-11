import assert from 'assert'
import { getOriginAccountId } from '../../../common/helpers'
import { Staker, StakingRole } from '../../../model'
import { CallHandlerContext } from '../../types/contexts'

export async function handleChill(ctx: CallHandlerContext) {
    if (!ctx.call.success) return

    const accountId = getOriginAccountId(ctx.call.origin)

    const staker = await ctx.store.get(Staker, {
        where: {
            controllerId: accountId,
        },
    })
    assert(staker != null, `Missing staking info for ${accountId}`)

    staker.role = StakingRole.Idle
    staker.commission = null

    await ctx.store.save(staker)
}
