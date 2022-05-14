import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../../common/errors'
import { BondType } from '../../../../model'
import { ParachainStakingNominatorLeftEvent } from '../../../../types/generated/events'
import { saveBondEvent } from '../../utils/base'

interface EventData {
    account: Uint8Array
    amount: bigint
    newTotal: bigint
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingNominatorLeftEvent(ctx)

    if (event.isV900) {
        const [account, amount] = event.asV900
        return {
            account,
            amount: -amount,
            newTotal: 0n,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleNominatorLeft: EventHandler = async (ctx) => {
    if (
        ctx.block.events.find(
            (event) =>
                event.extrinsicId === ctx.event.extrinsic?.id && event.name === 'parachainStaking.NominatorLeftCollator'
        )
    )
        return

    const data = getEventData(ctx)

    await saveBondEvent(ctx, {
        ...data,
        type: BondType.Unbond,
    })
}
