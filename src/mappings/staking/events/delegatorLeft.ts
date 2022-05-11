import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { ParachainStakingDelegatorLeftEvent } from '../../../types/generated/events'
import { saveBondEvent } from '../utils/base'

interface EventData {
    account: Uint8Array
    amount: bigint
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingDelegatorLeftEvent(ctx)

    if (event.isV1001) {
        const [account, amount] = event.asV1001
        return {
            account,
            amount: -amount,
        }
    } else if (event.isV1300) {
        const { delegator: account, unstakedAmount: amount } = event.asV1300
        return {
            account,
            amount: -amount,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleDelegatorLeft: EventHandler = async (ctx) => {
    if (
        ctx.block.events.find(
            (event) =>
                event.extrinsicId === ctx.event.extrinsic?.id &&
                event.name === 'parachainStaking.DelegatorLeftCandidate'
        )
    )
        return

    const data = getEventData(ctx)

    await saveBondEvent(ctx, data)
}
