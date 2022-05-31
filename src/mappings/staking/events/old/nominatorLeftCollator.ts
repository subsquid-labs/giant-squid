import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../../common/errors'
import { encodeId } from '../../../../common/helpers'
import { BondType } from '../../../../model'
import { ParachainStakingNominatorLeftCollatorEvent } from '../../../../types/generated/events'
import { saveBond } from '../../utils/savers'
interface EventData {
    account: Uint8Array
    amount: bigint
    candidate: Uint8Array
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingNominatorLeftCollatorEvent(ctx)

    if (event.isV49) {
        const [account, candidate, amount] = event.asV49
        return {
            account,
            amount,
            candidate,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleNominatorLeftCandidate: EventHandler = async (ctx) => {
    const data = getEventData(ctx)

    await saveBond(ctx, {
        account: encodeId(data.account),
        candidate: encodeId(data.candidate),
        amount: data.amount,
        type: BondType.Unbond,
        success: true,
    })
}
