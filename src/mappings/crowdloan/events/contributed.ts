import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { ContributionData } from '../../../types/custom/crowdloanData'
import { CrowdloanContributedEvent } from '../../../types/generated/events'
import { saveContributedEvent } from '../utils/base'

function getEventData(ctx: EventHandlerContext): ContributionData {
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

    await saveContributedEvent(ctx, data)
}
