import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { stakingInfoManager } from '../../../managers'
import { StakingRole } from '../../../model'
import storage from '../../../storage'
import { StakingNominateCall } from '../../../types/generated/calls'

interface CallData {
    targets: Uint8Array[]
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData | undefined {
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

export async function handleNominate(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    // const targets = data.targets.map((t) => encodeId(t))

    const controller = ctx.extrinsic.signer

    const ledger = await storage.staking.ledger.get(ctx, controller)
    if (!ledger) return

    const stakingInfo = await stakingInfoManager.get(ctx, ledger.stash)
    if (!stakingInfo) return

    stakingInfo.role = StakingRole.Nominator

    await stakingInfoManager.update(ctx, stakingInfo)
}
