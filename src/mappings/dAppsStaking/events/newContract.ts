import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import { encodeEvm, encodeId } from '../../../common/helpers'
import { DAppContract, DAppState } from '../../../model'
import { DappsStakingNewContractEvent } from '../../../types/events'
import { getOrCreateAccount, getOrCreateStaker } from '../../util/entities'

interface EventData {
    account: Uint8Array
    smartContract: Uint8Array
}

function getEventData(ctx: EventHandlerContext<Store>): EventData {
    const event = new DappsStakingNewContractEvent(ctx)

    if (event.isV4) {
        const [account, smartContract] = event.asV4
        return {
            account,
            smartContract: smartContract.value,
        }
    }
    ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
    try {
        const [account, smartContract] = ctx._chain.decodeEvent(ctx.event)
        return {
            account,
            smartContract: smartContract.value,
        }
    } catch {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handlerNewContract(ctx: EventHandlerContext<Store>) {
    const data = getEventData(ctx)
    const contract = new DAppContract({
        id: encodeEvm(data.smartContract),
        developer: await getOrCreateAccount(ctx, encodeId(data.account)),
        activeStake: 0n,
        state: DAppState.REGISTERED,
    })
    await ctx.store.save(contract)
}
