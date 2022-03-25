import { BalancesTransferEvent } from '../../../types/generated/events'
import { TransferData } from '../../../types/custom/balanceData'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import { saveTransferEvent } from '../utils/base'

function getEventData(ctx: EventHandlerContext): TransferData {
    const event = new BalancesTransferEvent(ctx)
    if (event.isV900) {
        const [from, to, amount] = event.asV900
        return {
            from,
            to,
            amount,
        }
    } else if (event.isV1201) {
        const { from, to, amount } = event.asV1201
        return {
            from,
            to,
            amount,
        }
    } else {
        const { from, to, amount } = event.asLatest
        return {
            from,
            to,
            amount,
        }
    }
}

// function checkExtrinsic(extrinsic: SubstrateExtrinsic): boolean {
//     const methods = ['transfer', 'transfer_all', 'force_transfer', 'transfer_keep_alive']
//     return extrinsic.section === 'balances' && methods.includes(snakeCase(extrinsic.method))
// }

export async function handleTransfer(ctx: EventHandlerContext) {
    // if (!ctx.extrinsic || !checkExtrinsic(ctx.extrinsic)) return

    const data = getEventData(ctx)

    await saveTransferEvent(ctx, data)
}
