import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeID } from '../../../common/helpers'
import config from '../../../config'
import { StakingKickCall } from '../../../types/generated/calls'
import { saveKickCall } from '../base/savers'

interface CallData {
    nominators: Uint8Array[]
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData | undefined {
    const call = new StakingKickCall(ctx)

    if (call.isV2028) {
        const { who } = call.asV2028
        return {
            nominators: who.map((t) => t.value as Uint8Array),
        }
    } else if (call.isV9111) {
        const { who } = call.asV9111
        return {
            nominators: who.map((t) => t.value as Uint8Array),
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleBond(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    if (!data) return

    const nominators: string[] = []
    for (const t of data.nominators) {
        const nominator = encodeID(t, config.prefix)
        if (!nominator) return

        nominators.push(nominator)
    }

    await saveKickCall(ctx, { nominators })
}
