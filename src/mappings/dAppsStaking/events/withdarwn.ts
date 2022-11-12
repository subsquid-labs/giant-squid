import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import { DappsStakingWithdrawnEvent } from '../../../types/events'
import { getOrCreateStaker } from '../../util/entities'

interface EventData {
    amount: bigint
    account: Uint8Array
}

function getEventData(ctx: EventHandlerContext<Store>): EventData {
    const event = new DappsStakingWithdrawnEvent(ctx)

    if (event.isV12) {
        const [account, amount] = event.asV12
        return {
            account,
            amount,
        }
    }
    ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
    try {
        const [account, amount] = ctx._chain.decodeEvent(ctx.event)
        return {
            account,
            amount,
        }
    } catch {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleWithdrawn(ctx: EventHandlerContext<Store>) {
    const data = getEventData(ctx)
    const staker = await getOrCreateStaker(ctx, encodeId(data.account))
    staker.unbondindVolume -= data.amount

    await ctx.store.save(staker)
}
