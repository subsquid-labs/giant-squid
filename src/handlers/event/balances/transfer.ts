import { BalancesTransferEvent } from '../../../types/events'
import { TransferData } from '../../../common/types/balanceData'
import { EventHandlerContext, SubstrateExtrinsic } from '@subsquid/substrate-processor'
import config from '../../../config'
import { encodeID, getOrCreate, populateMeta } from '../../../common/helpers'
import { Transfer } from '../../../model'
import { snakeCase } from 'snake-case'

function getEventData(ctx: EventHandlerContext): TransferData {
    let event = new BalancesTransferEvent(ctx)
    if (event.isV0) {
        let [from, to, amount] = event.asV0
        return {
            from: from,
            to: to,
            amount: amount,
        }
    } else {
        let { from, to, amount } = event.asLatest
        return {
            from: from,
            to: to,
            amount: amount,
        }
    }
}

function checkExtrinsic(extrinsic: SubstrateExtrinsic): boolean {
    const methods = Object.keys(config.extrinsicsHandlers?.['balances'] || {})
    return extrinsic.section == 'balances' && methods.includes(snakeCase(extrinsic.method))
}

async function saveTransferEvent(ctx: EventHandlerContext, data: TransferData) {
    const id = `${ctx.extrinsic?.id}`

    const transfer = await getOrCreate(ctx.store, Transfer, id)

    populateMeta(ctx, transfer)

    transfer.chainName ??= config.chainName

    transfer.amount ??= data.amount
    transfer.from ??= encodeID(data.from!, config.chainName)
    transfer.to ??= encodeID(data.to, config.chainName)

    await ctx.store.save(transfer)
}

export async function handleTransfer(ctx: EventHandlerContext) {
    if (!ctx.extrinsic || !checkExtrinsic(ctx.extrinsic)) return

    const data = getEventData(ctx)

    await saveTransferEvent(ctx, data)
}
