import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import config from '../../../config'
import { StakingNominateCall } from '../../../types/generated/calls'
import { saveNominateCall } from '../utils/savers'

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

    const targets: string[] = []
    for (const t of data.targets) {
        const target = encodeId(t, config.prefix)
        if (!target) return

        targets.push(target)
    }

    await saveNominateCall(ctx, { targets })
}
