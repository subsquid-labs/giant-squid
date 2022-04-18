import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { StakeData } from '../../../types/custom/stakingData'
import { ParachainStakingCandidateBondedLessEvent } from '../../../types/generated/events'
import { saveStakeEvent } from '../utils/base'

function getEventData(ctx: EventHandlerContext): StakeData {
    const event = new ParachainStakingCandidateBondedLessEvent(ctx)

    if (event.isV1001) {
        const [account, amount, newTotal] = event.asV1001
        return {
            account,
            amount: -amount,
            newTotal,
        }
    } else if (event.isV1300) {
        const { candidate: account, amount, newBond: newTotal } = event.asV1300
        return {
            account,
            amount: -amount,
            newTotal,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export async function handleBondedLess(ctx: EventHandlerContext) {
    const data = getEventData(ctx)
    if (!data) return

    await saveStakeEvent(ctx, data)
}
