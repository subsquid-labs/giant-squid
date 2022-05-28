import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../../common/errors'
import { encodeId } from '../../../../common/helpers'
import { BondType } from '../../../../model'
import { ParachainStakingCollatorBondedMoreEvent } from '../../../../types/generated/events'
import { saveBond } from '../../utils/savers'

interface EventData {
    account: Uint8Array
    amount: bigint
    newTotal: bigint
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingCollatorBondedMoreEvent(ctx)

    if (event.isV49) {
        const [account, amount, newTotal] = event.asV49
        return {
            account,
            amount,
            newTotal,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleCollatorBondedMore: EventHandler = async (ctx) => {
    const data = getEventData(ctx)

    await saveBond(ctx, {
        account: encodeId(data.account),
        newTotal: data.newTotal,
        amount: data.amount,
        type: BondType.Unbond,
        success: true,
    })
}
