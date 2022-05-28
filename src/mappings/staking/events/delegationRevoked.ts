import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import { BondType } from '../../../model'
import { ParachainStakingDelegationRevokedEvent } from '../../../types/generated/events'
import { saveBond } from '../utils/savers'

interface EventData {
    account: Uint8Array
    amount: bigint
    candidate: Uint8Array
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingDelegationRevokedEvent(ctx)

    if (event.isV1001) {
        const [account, candidate, amount] = event.asV1001
        return {
            account,
            amount,
            candidate,
        }
    } else if (event.isV1300) {
        const { delegator: account, unstakedAmount: amount, candidate } = event.asV1300
        return {
            account,
            amount,
            candidate,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleDelegationRevoked: EventHandler = async (ctx) => {
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
        candidate: encodeId(data.candidate),
        amount: data.amount,
        type: BondType.Unbond,
        success: true,
    })
}
