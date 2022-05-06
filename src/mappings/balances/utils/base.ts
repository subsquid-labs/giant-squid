import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { encodeId, isExtrinsicSuccess } from '../../../common/helpers'
import { TransferData } from '../../../types/custom/balanceData'
import config from '../../../config'
import { AccountTransfer, TransferDicrection } from '../../../model'
import { transferManager } from '../../../managers'

export enum Direction {
    FROM,
    TO,
}

export async function saveTransferEvent(ctx: EventHandlerContext, data: TransferData, success = true) {
    const idFrom = data.from ? encodeId(data.from, config.prefix) : ctx.extrinsic?.signer
    const idTo = encodeId(data.to, config.prefix)
    if (!idFrom || !idTo) return

    const transfer = await transferManager.create(ctx, {
        chain: config.chainName,
        from: idFrom,
        to: idTo,
        amount: data.amount || 0n,
        success,
    })

    await ctx.store.insert(
        AccountTransfer,
        new AccountTransfer({
            id: `${transfer.id}-from`,
            transfer,
            account: transfer.from,
            direction: TransferDicrection.FROM,
        })
    )

    await ctx.store.insert(
        AccountTransfer,
        new AccountTransfer({
            id: `${transfer.id}-to`,
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
