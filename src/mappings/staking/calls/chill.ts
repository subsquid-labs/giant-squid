import assert from 'assert'
import { getOriginAccountId } from '../../../common/tools'
import { Staker, StakingRole } from '../../../model'
import { CallHandlerContext } from '../../types/contexts'
import { getOrCreateStaker } from '../../util/entities'

export async function handleChill(ctx: CallHandlerContext) {
    if (!ctx.call.success) return

    const controllerId = getOriginAccountId(ctx.call.origin)
    if (!controllerId) return

    const staker = await getOrCreateStaker(ctx, 'Controller', controllerId)
    assert(staker != null, `Missing staking info for ${controllerId}`)

    staker.role = StakingRole.Idle
    staker.commission = null

    await ctx.store.save(staker)
}
