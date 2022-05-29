import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { stakingInfoManager } from '../../../managers'
import { StakingRole } from '../../../model'
import storage from '../../../storage'

export async function handleChill(ctx: ExtrinsicHandlerContext) {
    const controller = ctx.extrinsic.signer

    const ledger = await storage.staking.ledger.get(ctx, controller)
    if (!ledger) return

    const stakingInfo = await stakingInfoManager.get(ctx, ledger.stash)
    if (!stakingInfo) return

    stakingInfo.role = StakingRole.Idle

    await stakingInfoManager.update(ctx, stakingInfo)
}
