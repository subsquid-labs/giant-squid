import { BalancesTransferEvent } from '../../../types/generated/events'
import { TransferData } from '../../../types/custom/balanceData'
import { EventHandlerContext, SubstrateExtrinsic } from '@subsquid/substrate-processor'
import { snakeCase } from 'snake-case'
import { saveTransferEvent } from '../utils/base'

function getEventData(ctx: EventHandlerContext): TransferData {
    const event = new BalancesTransferEvent(ctx)
    if (event.isV1020) {
        const [from, to, amount] = event.asV1020
        return {
            from,
            to,
            amount,
        }
    } else if (event.isV1050) {
        const [from, to, amount] = event.asV1050
        return {
            from,
            to,
            amount,
        }
    } else if (event.isV9130) {
        const { from, to, amount } = event.asV9130
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
