import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import config from '../../../config'
import { StakingBondedEvent } from '../../../types/generated/events'
import { saveBondEvent } from '../utils/savers'

interface StakeEventData {
    amount: bigint
    account?: Uint8Array
}

function getEventData(ctx: EventHandlerContext): StakeEventData {
    const event = new StakingBondedEvent(ctx)

    if (event.isV0) {
        const [account, amount] = event.asV0
        return {
            account,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleBonded(ctx: EventHandlerContext) {
    const data = getEventData(ctx)
    if (!data) return

    const account = data.account ? encodeId(data.account, config.prefix) : null
    if (!account) return

    await saveBondEvent(ctx, {
        account,
        amount: data.amount,
    })
}
