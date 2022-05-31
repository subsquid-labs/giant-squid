import { EventHandlerContext, toHex } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeEvm, encodeId } from '../../../common/helpers'
import { DappsStakingRewardEvent } from '../../../types/generated/events'
import { saveReward } from '../utils/savers'

export interface EventData {
    amount: bigint
    account: Uint8Array
    smartContract: Uint8Array
    era: number
    type: 'Evm' | 'Wasm'
}

function getEventData(ctx: EventHandlerContext): EventData | undefined {
    const event = new DappsStakingRewardEvent(ctx)

    if (event.isV4) {
        const [account, smartContract, era, amount] = event.asV4
        return {
            account,
            amount,
            smartContract: smartContract.value,
            era,
            type: smartContract.__kind,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleReward(ctx: EventHandlerContext) {
    const data = getEventData(ctx)
    if (!data) return

    await saveReward(ctx, {
        account: encodeId(data.account),
        amount: data.amount,
        era: data.era,
        smartContract: data.type === 'Evm' ? encodeEvm(data.smartContract) : toHex(data.smartContract),
    })
}
