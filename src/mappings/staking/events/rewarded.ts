import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import { ParachainStakingRewardedEvent } from '../../../types/generated/events'
import { saveReward } from '../utils/savers'

interface EventData {
    amount: bigint
    account: Uint8Array
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingRewardedEvent(ctx)

    if (event.isV900) {
        const [account, amount] = event.asV900
        return {
            account,
            amount,
        }
    } else if (event.isV1300) {
        const { account, rewards: amount } = event.asV1300
        return {
            account,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export const handleRewarded: EventHandler = async (ctx) => {
    const data = getEventData(ctx)

    await saveReward(ctx, {
        account: encodeId(data.account),
        amount: data.amount,
    })
}
