import assert from 'assert'
import { getOriginAccountId, isStorageCorrupted, logCall } from '../../../common/tools'
import { Staker, StakingRole } from '../../../model'
import storage from '../../../storage'
import { CallHandlerContext } from '../../types/contexts'
import { getOrCreateStaker } from '../../util/entities'

export async function handleChill(ctx: CallHandlerContext) {
    logCall(ctx)

    if (!ctx.call.success) return

    const controllerId = getOriginAccountId(ctx.call.origin)
    if (!controllerId) return

    let stashId = await storage.staking.ledger.get(ctx, controllerId)
    if (!stashId) return

    const staker = await getOrCreateStaker(ctx, controllerId)
    assert(staker != null, `Missing staking info for ${controllerId}`)

    staker.role = StakingRole.Idle

    await ctx.store.save(staker)
}
