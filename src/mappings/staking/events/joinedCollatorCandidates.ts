import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import { BondType } from '../../../model'
import { ParachainStakingJoinedCollatorCandidatesEvent } from '../../../types/generated/events'
import { saveBond } from '../utils/savers'

interface EventData {
    account: Uint8Array
    amount: bigint
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingJoinedCollatorCandidatesEvent(ctx)

    if (event.isV49) {
        const [account, amount] = event.asV49
        return {
            account,
            amount,
        }
    } else if (event.isV1300) {
        const { account, amountLocked: amount } = event.asV1300
        return {
            account,
            amount,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleJoinedCollatorCandidates: EventHandler = async (ctx) => {
    const data = getEventData(ctx)

    await saveBond(ctx, {
        account: encodeId(data.account),
        amount: data.amount,
        type: BondType.Bond,
        success: true,
    })
}
