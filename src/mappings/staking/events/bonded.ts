import { EventHandlerContext } from '@subsquid/substrate-processor'
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

    if (event.isV1051) {
        const [account, amount] = event.asV1051
        return {
            account,
            amount,
        }
    } else {
        const [account, amount] = event.asLatest
        return {
            account,
            amount,
        }
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
