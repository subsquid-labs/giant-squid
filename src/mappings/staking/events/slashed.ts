import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import storage from '../../../storage'
import { StakingSlashedEvent, StakingSlashEvent } from '../../../types/generated/events'
import { saveSlash } from '../utils/savers'

interface EventData {
    amount: bigint
    account: Uint8Array
}

function getSlashedEvent(ctx: EventHandlerContext): EventData {
    const event = new StakingSlashedEvent(ctx)

    if (event.isV29) {
        const [account, amount] = event.asV29
        return {
            account,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

function getSlashEvent(ctx: EventHandlerContext): EventData {
    const event = new StakingSlashEvent(ctx)

    if (event.isV13) {
        const [account, amount] = event.asV13
        return {
            account,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleSlashed(ctx: EventHandlerContext, old = false) {
    const data = old ? getSlashEvent(ctx) : getSlashedEvent(ctx)
    await saveSlash(ctx, {
        account: encodeId(data.account),
        amount: data.amount,
        era: (await storage.staking.getCurrentEra(ctx))?.index || 0,
    })
}

export const handleSlash = (ctx: EventHandlerContext) => {
    return handleSlashed(ctx, true)
}
