import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { BondType } from '../../../model'
import { ParachainStakingCandidateBondedMoreEvent } from '../../../types/generated/events'
import { saveBondEvent } from '../utils/base'

interface EventData {
    account: Uint8Array
    amount: bigint
    newTotal: bigint
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingCandidateBondedMoreEvent(ctx)

    if (event.isV1300) {
        const { candidate: account, amount, newTotalBond: newTotal } = event.asV1300
        return {
            account,
            amount,
            newTotal,
        }
    } else if (event.isV1001) {
        const [account, amount, newTotal] = event.asV1001
        return {
            account,
            amount,
            newTotal,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleBondedMore: EventHandler = async (ctx) => {
    const data = getEventData(ctx)

    await saveBondEvent(ctx, {
        ...data,
        type: BondType.Bond,
    })
}
