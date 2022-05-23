import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { isExtrinsicSuccess } from '../../../common/helpers'
import { stakingInfoManager } from '../../../managers'
import { StakingRole } from '../../../model'
import storage from '../../../storage'

export async function handleChill(ctx: ExtrinsicHandlerContext) {
    if (!isExtrinsicSuccess(ctx)) return

    const controller = ctx.extrinsic.signer

    const ledger = await storage.staking.ledger.get(ctx, controller)
    if (!ledger) return

    const stakingInfo = await stakingInfoManager.get(ctx, ledger.stash)
    if (!stakingInfo) return

    stakingInfo.role = StakingRole.Indle

    await stakingInfoManager.update(ctx, stakingInfo)
}
