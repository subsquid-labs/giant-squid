import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { stakingInfoManager } from '../../../managers'
import { StakingRole } from '../../../model'
import storage from '../../../storage'
import { StakingValidateCall } from '../../../types/generated/calls'

interface CallData {
    commission: number
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData | undefined {
    const call = new StakingValidateCall(ctx)

    if (call.isV13) {
        const { prefs } = call.asV13
        return {
            commission: prefs.commission,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleValidate(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    const controller = ctx.extrinsic.signer

    const stash = (await storage.staking.ledger.get(ctx, controller))?.stash
    if (!stash) return

    const stakingInfo = await stakingInfoManager.get(ctx, stash)
    if (!stakingInfo) return

    stakingInfo.commission = data.commission
    stakingInfo.role = StakingRole.Validator

    await stakingInfoManager.update(ctx, stakingInfo)
}
