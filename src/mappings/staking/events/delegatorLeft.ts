import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import { BondType } from '../../../model'
import { ParachainStakingDelegatorLeftEvent } from '../../../types/generated/events'
import { saveBond } from '../utils/savers'

interface EventData {
    account: Uint8Array
    amount: bigint
    newTotal: bigint
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingDelegatorLeftEvent(ctx)

    if (event.isV1001) {
        const [account, amount] = event.asV1001
        return {
            account,
            amount,
            newTotal: 0n,
        }
    } else if (event.isV1300) {
        const { delegator: account, unstakedAmount: amount } = event.asV1300
        return {
            account,
            amount,
            newTotal: 0n,
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

    await saveBond(ctx, {
        account: encodeId(data.account),
        amount: data.amount,
        type: BondType.Unbond,
        success: true,
        newTotal: data.newTotal,
    })
}
