import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import { BondType } from '../../../model'
import { ParachainStakingDelegationEvent } from '../../../types/generated/events'
import { saveBond } from '../utils/savers'

interface EventData {
    account: Uint8Array
    amount: bigint
    candidate: Uint8Array
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingDelegationEvent(ctx)

    if (event.isV1001) {
        const [account, amount, candidate] = event.asV1001
        return {
            account,
            amount,
            candidate,
        }
    } else if (event.isV1300) {
        const { delegator: account, lockedAmount: amount, candidate } = event.asV1300
        return {
            account,
            amount,
            candidate,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleDelegation: EventHandler = async (ctx) => {
    const data = getEventData(ctx)

    await saveBond(ctx, {
        account: encodeId(data.account),
        candidate: encodeId(data.candidate),
        amount: data.amount,
        type: BondType.Bond,
        success: true,
    })
}
