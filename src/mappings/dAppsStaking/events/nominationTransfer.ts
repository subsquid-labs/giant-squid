import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import assert from 'assert'
import { UnknownVersionError } from '../../../common/errors'
import { encodeEvm, encodeId } from '../../../common/helpers'
import { BondType, DAppContract } from '../../../model'
import { DappsStakingNominationTransferEvent } from '../../../types/events'
import { processStakeChange } from '../utils/actions'
import { getOrCreateStaker, getOrCreateStakeState } from '../../util/entities'

interface EventData {
    amount: bigint
    account: Uint8Array
    fromContract: Uint8Array
    toContract: Uint8Array
}

function getEventData(ctx: EventHandlerContext<Store>): EventData {
    const event = new DappsStakingNominationTransferEvent(ctx)

    if (event.isV17) {
        const [account, fromContract, amount, toContract] = event.asV17
        return {
            account,
            amount,
            fromContract: fromContract.value,
            toContract: toContract.value,
        }
    }
    ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
    try {
        const [account, fromContract, amount, toContract] = ctx._chain.decodeEvent(ctx.event)
        return {
            account,
            amount,
            fromContract: fromContract.value,
            toContract: toContract.value,
        }
    } catch {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleNominationTransfer(ctx: EventHandlerContext<Store>) {
    const data = getEventData(ctx)
    const stakerId = encodeId(data.account)
    await Promise.all([
        processStakeChange(ctx, stakerId, encodeEvm(data.fromContract), BondType.Unbond, data.amount),
        processStakeChange(ctx, stakerId, encodeEvm(data.toContract), BondType.Bond, data.amount),
    ])
}
