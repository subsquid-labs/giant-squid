import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import { BondType } from '../../../model'
import { StakingBondedEvent } from '../../../types/generated/events'
import { saveBond } from '../utils/savers'

interface EventData {
    amount: bigint
    account: Uint8Array
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new StakingBondedEvent(ctx)

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

export async function handleBonded(ctx: EventHandlerContext) {
    const data = getEventData(ctx)
    if (!data) return

    await saveBond(ctx, {
        account: encodeId(data.account),
        amount: data.amount,
        success: true,
        type: BondType.Bond,
    })
}
