import { UnknownVersionError } from '../../../../common/errors'
import { encodeId } from '../../../../common/tools'
import { BondType } from '../../../../model'
import { ParachainStakingNominationDecreasedEvent } from '../../../../types/generated/events'
import { EventContext, EventHandlerContext } from '../../../types/contexts'
import { saveBond } from '.././utils'

interface EventData {
    account: Uint8Array
    amount: bigint
    candidate: Uint8Array
}

function getEventData(ctx: EventContext): EventData {
    const event = new ParachainStakingNominationDecreasedEvent(ctx)

    if (event.isV49) {
        const [account, candidate, amount] = event.asV49
        return {
            account,
            amount,
            candidate,
        }
    } else if (event.isV53) {
        const [account, candidate, amount] = event.asV53
        return {
            account,
            amount: -amount,
            candidate,
        }
    } else if (event.isV501) {
        const [account, candidate, amount] = event.asV501
        return {
            account,
            amount: -amount,
            candidate,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleNominationDecreased(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    await saveBond(ctx, {
        id: ctx.event.id,
        blockNumber: ctx.block.height,
        timestamp: new Date(ctx.block.timestamp),
        extrinsicHash: ctx.event.extrinsic?.hash,
        accountId: encodeId(data.account),
        candidateId: encodeId(data.candidate),
        amount: data.amount,
        type: BondType.Unbond,
        success: true,
    })
}