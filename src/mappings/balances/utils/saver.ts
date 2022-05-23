import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { getMeta, isExtrinsicSuccess } from '../../../common/helpers'
import { accountManager } from '../../../managers'
import { AccountTransfer, Transfer, TransferDicrection } from '../../../model'
import { TransferData } from './types'

export enum Direction {
    FROM,
    TO,
}

export async function saveTransfer(ctx: ExtrinsicHandlerContext, data: TransferData) {
    const id = ctx.event.id

    const from = await accountManager.get(ctx, data.from)
    const to = await accountManager.get(ctx, data.to)

    const transfer = new Transfer({
        id,
        ...getMeta(ctx),
        from,
        to,
        amount: data.amount,
        success: isExtrinsicSuccess(ctx),
    })

    await ctx.store.insert(Transfer, transfer)

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