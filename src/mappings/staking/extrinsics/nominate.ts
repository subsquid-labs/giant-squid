import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeID } from '../../../common/helpers'
import config from '../../../config'
import { StakingNominateCall } from '../../../types/generated/calls'
import { saveNominateCall } from '../base/savers'

interface CallData {
    targets: Uint8Array[]
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData | undefined {
    const call = new StakingNominateCall(ctx)

    if (call.isV1020) {
        return undefined
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

export async function handleBond(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    const targets: string[] = []
    for (const t of data.targets) {
        const target = encodeID(t, config.prefix)
        if (!target) return

        targets.push(target)
    }

    await saveNominateCall(ctx, { targets })
}
