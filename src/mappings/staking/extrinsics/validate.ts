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
