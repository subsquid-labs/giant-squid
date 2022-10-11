import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/tools'
import { Crowdloan } from '../../../model'
import storage from '../../../storage'
import { CrowdloanContributedEvent, CrowdloanCreatedEvent } from '../../../types/kusama/events'
import { EventContext } from '../../types/contexts'
import { ActionData } from '../../types/data'
import { getOrCreateParachain } from '../../util/entities'

interface EventData {
    accountId: string
    paraId: number
    amount: bigint
}

function getEventData(ctx: EventContext): EventData {
    const event = new CrowdloanContributedEvent(ctx)

    if (event.isV9010) {
        const [accountId, paraId, amount] = event.asV9010
        return {
            accountId: encodeId(accountId),
            paraId,
            amount,
        }
    } else if (event.isV9230) {
        const { who, fundIndex, amount } = event.asV9230
        return {
            accountId: encodeId(who),
            paraId: fundIndex,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface ContributedData extends ActionData {
    accountId: string
    paraId: number
    amount: bigint
}

export function processContributed(ctx: EventHandlerContext<Store, { event: { args: true } }>): ContributedData {
    const data = getEventData(ctx)

    return {
        id: ctx.event.id,
        blockNumber: ctx.block.height,
        timestamp: new Date(ctx.block.timestamp),
        ...data,
    }
}
