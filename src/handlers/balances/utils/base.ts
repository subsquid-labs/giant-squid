import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { populateMeta, encodeID, isExtrinsicSuccess } from '../../../common/helpers'
import { TransferData } from '../../../types/custom/balanceData'
import config from '../../../config'
import { AccountTransfer, Transfer, TransferDicrection } from '../../../model'
import { getAccount } from '../../../common/entityUtils'

export enum Direction {
    FROM,
    TO,
}

export async function saveTransferEvent(ctx: EventHandlerContext, data: TransferData, success = true) {
    const id = ctx.event.id

    const transfer = new Transfer({ id: `${id}` })

    populateMeta(ctx, transfer)

    transfer.chainName ??= config.chainName
    transfer.name ??= ctx.extrinsic?.name
    transfer.success ??= success

    transfer.amount ??= data.amount

    const idFrom = data.from ? encodeID(data.from, config.prefix) : ctx.extrinsic?.signer
    const idTo = encodeID(data.to, config.prefix)
    if (!idFrom || !idTo) return

    transfer.from = await getAccount(ctx, idFrom)
    transfer.to = await getAccount(ctx, idTo)

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
