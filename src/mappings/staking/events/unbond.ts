import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/tools'
import { BondType } from '../../../model'
import { StakingUnbondedEvent } from '../../../types/kusama/events'
import { EventContext } from '../../../types/support'
import { ActionData } from '../../types/data'

interface EventData {
    amount: bigint
    stashId: string
}

function getEventData(ctx: EventContext): EventData {
    const event = new StakingUnbondedEvent(ctx)

    if (event.isV1051) {
        const [stashId, amount] = event.asV1051
        return {
            amount,
            stashId: encodeId(stashId),
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function processUnbond(
    ctx: EventHandlerContext<
        unknown,
        {
            event: {
                args: true
                extrinsic: { hash: true }
            }
        }
    >
): UnbondData {
    const data = getEventData(ctx)

    return {
        id: ctx.event.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.event.extrinsic?.hash,
        stashId: data.stashId,
        amount: data.amount,
        type: BondType.Unbond,
    }
}

export interface UnbondData extends ActionData {
    amount: bigint
    stashId: string
    type: BondType.Unbond
}
