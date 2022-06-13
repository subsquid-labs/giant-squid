import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/tools'
import { ParachainStakingRewardedEvent } from '../../../types/generated/events'
import { EventContext, EventHandlerContext } from '../../types/contexts'
import { saveReward } from './utils'

interface EventData {
    amount: bigint
    account: Uint8Array
}

function getEventData(ctx: EventContext): EventData {
    const event = new ParachainStakingRewardedEvent(ctx)

    if (event.isV49) {
        const [account, amount] = event.asV49
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

export async function handleRewarded(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    await saveReward(ctx, {
        id: ctx.event.id,
        blockNumber: ctx.block.height,
        timestamp: new Date(ctx.block.timestamp),
        extrinsicHash: ctx.event.extrinsic?.hash,
        accountId: encodeId(data.account),
        amount: data.amount,
    })
}
