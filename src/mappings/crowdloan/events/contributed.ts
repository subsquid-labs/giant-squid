import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import { CrowdloanContributedEvent } from '../../../types/generated/events'
import { saveContribution } from '../utils/saver'

interface EventData {
    paraId: number
    amount: bigint
    account: Uint8Array
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new CrowdloanContributedEvent(ctx)

    if (event.isV9010) {
        const [account, paraId, amount] = event.asV9010
        return {
            account,
            paraId,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleContributed(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    await saveContribution(ctx, {
        account: encodeId(data.account),
        amount: data.amount,
        paraId: data.paraId,
        success: true,
    })
}
