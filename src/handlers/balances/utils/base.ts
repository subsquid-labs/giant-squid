import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { populateMeta, encodeID, getAccount, isExtrinsicSuccess } from '../../../common/helpers'
import { TransferData } from '../../../types/custom/balanceData'
import config from '../../../config'
import { AccountTransfer, Transfer, TransferDicrection } from '../../../model'

export enum Direction {
    FROM,
    TO,
}

async function populateTransferItem(
    transfer: Transfer,
    options: {
        ctx: EventHandlerContext
        data: TransferData
        success: boolean
    }
) {
    const { ctx, data, success } = options

    populateMeta(ctx, transfer)

    transfer.chainName ??= config.chainName
    transfer.name ??= ctx.extrinsic?.name
    transfer.success ??= success

    transfer.amount ??= data.amount

    const idFrom = data.from ? encodeID(data.from, config.prefix) : ctx.extrinsic?.signer
    const idTo = encodeID(data.to, config.prefix)

    transfer.from = idFrom ? await getAccount(ctx.store, idFrom) : null
    transfer.to = idTo ? await getAccount(ctx.store, idTo) : null
}

export async function saveTransferEvent(ctx: EventHandlerContext, data: TransferData, success = true) {
    const id = ctx.event.id

    const transfer = new Transfer({ id: `${id}` })
    await populateTransferItem(transfer, { ctx, data, success: success })

    await ctx.store.save(transfer)

    await ctx.store.save(
        new AccountTransfer({
            id: `${id}-from`,
            transfer,
            account: transfer.from,
            direction: TransferDicrection.FROM,
        })
    )

    await ctx.store.save(
        new AccountTransfer({
            id: `${id}-to`,
            transfer,
            account: transfer.to,
            direction: TransferDicrection.TO,
        })
    )
}

export async function saveTransferCall(ctx: ExtrinsicHandlerContext, data: TransferData) {
    if (isExtrinsicSuccess(ctx)) return

    await saveTransferEvent(ctx, data, false)
}
