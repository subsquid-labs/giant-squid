import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import config from '../../../config'
import { StakingUnbondedEvent } from '../../../types/generated/events'
import { saveBondEvent } from '../utils/savers'

interface StakeEventData {
    amount: bigint
    account?: Uint8Array
}

function getEventData(ctx: EventHandlerContext): StakeEventData {
    const event = new StakingUnbondedEvent(ctx)

    if (event.isV1051) {
        const [account, amount] = event.asV1051
        return {
            account,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleUnbonded(ctx: EventHandlerContext) {
    const data = getEventData(ctx)
    if (!data) return

    const account = data.account ? encodeId(data.account, config.prefix) : null
    if (!account) return

    await saveBondEvent(ctx, {
        account,
        amount: data.amount,
    })
}
