import { assertNotNull, EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import { encodeEvm } from '../../../common/helpers'
import { DAppContract, DAppState } from '../../../model'
import { DappsStakingContractRemovedEvent } from '../../../types/events'

interface EventData {
    smartContract: Uint8Array
}

function getEventData(ctx: EventHandlerContext<Store>): EventData {
    const event = new DappsStakingContractRemovedEvent(ctx)

    if (event.isV4) {
        const [, smartContract] = event.asV4
        return {
            smartContract: smartContract.value,
        }
    }
    ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
    try {
        const [, smartContract] = ctx._chain.decodeEvent(ctx.event)
        return {
            smartContract: smartContract.value,
        }
    } catch {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handlerContractRemoved(ctx: EventHandlerContext<Store>) {
    const data = getEventData(ctx)
    const contract = assertNotNull(await ctx.store.get(DAppContract, encodeEvm(data.smartContract)))
    contract.state = DAppState.UNREGISTERED
    contract.activeStake = 0n
    await ctx.store.save(contract)
}
