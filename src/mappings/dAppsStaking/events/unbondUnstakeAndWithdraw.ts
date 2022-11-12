import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import assert from 'assert'
import { UnknownVersionError } from '../../../common/errors'
import { encodeEvm, encodeId } from '../../../common/helpers'
import { BondType, DAppContract } from '../../../model'
import { DappsStakingUnbondAndUnstakeEvent, DappsStakingUnbondUnstakeAndWithdrawEvent } from '../../../types/events'
import { processStakeChange } from '../utils/actions'
import { getOrCreateStaker, getOrCreateStakeState } from '../../util/entities'

interface EventData {
    amount: bigint
    account: Uint8Array
    smartContract: Uint8Array
}

function getEventData(ctx: EventHandlerContext<Store>): EventData {
    const event = new DappsStakingUnbondUnstakeAndWithdrawEvent(ctx)

    if (event.isV4) {
        const [account, smartContract, amount] = event.asV4
        return {
            account,
            amount,
            smartContract: smartContract.value,
        }
    }
    ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
    try {
        const [account, smartContract, amount] = ctx._chain.decodeEvent(ctx.event)
        return {
            account,
            amount,
            smartContract: smartContract.value,
        }
    } catch {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleUnbondUnstakeAndWithdrawn(ctx: EventHandlerContext<Store>) {
    const data = getEventData(ctx)
    await processStakeChange(ctx, encodeId(data.account), encodeEvm(data.smartContract), BondType.Bond, data.amount)
}
