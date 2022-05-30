import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeEvm, encodeId } from '../../../common/helpers'
import { BondType } from '../../../model'
import { DappsStakingUnbondUnstakeAndWithdrawEvent } from '../../../types/generated/events'
import { saveBond } from '../utils/savers'

interface EventData {
    amount: bigint
    account: Uint8Array
    smartContract: Uint8Array
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new DappsStakingUnbondUnstakeAndWithdrawEvent(ctx)

    if (event.isV4) {
        const [account, smartContract, amount] = event.asV4
        return {
            account,
            amount,
            smartContract: smartContract.value,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleUnbonded(ctx: EventHandlerContext) {
    const data = getEventData(ctx)
    if (!data) return

    await saveBond(ctx, {
        account: encodeId(data.account),
        amount: data.amount,
        type: BondType.Unbond,
        smartContract: encodeEvm(data.smartContract),
        success: true,
    })
}
