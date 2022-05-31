import { EventHandlerContext, toHex } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeEvm, encodeId } from '../../../common/helpers'
import { BondType } from '../../../model'
import { DappsStakingBondAndStakeEvent } from '../../../types/generated/events'
import { saveBond } from '../utils/savers'

interface EventData {
    amount: bigint
    account: Uint8Array
    smartContract: Uint8Array
    type: 'Evm' | 'Wasm'
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new DappsStakingBondAndStakeEvent(ctx)

    if (event.isV4) {
        const [account, smartContract, amount] = event.asV4
        return {
            account,
            amount,
            smartContract: smartContract.value,
            type: smartContract.__kind,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleBonded(ctx: EventHandlerContext) {
    const data = getEventData(ctx)
    if (!data) return

    await saveBond(ctx, {
        account: encodeId(data.account),
        amount: data.amount,
        type: BondType.Bond,
        smartContract: data.type === 'Evm' ? encodeEvm(data.smartContract) : toHex(data.smartContract),
        success: true,
    })
}
