import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { getMeta, isExtrinsicSuccess } from '../../../common/helpers'
import { accountManager } from '../../../managers'
import { AccountTransfer, Transfer, TransferDirection } from '../../../model'
import { TransferData } from './types'

export enum Direction {
    FROM,
    TO,
}

export async function saveTransfer(ctx: EventHandlerContext, data: TransferData) {
    const id = ctx.event.id

    const from = await accountManager.get(ctx, data.from)
    const to = data.to ? await accountManager.get(ctx, data.to) : null

    const transfer = new Transfer({
        id,
        ...getMeta(ctx),
        from,
        to,
        amount: data.amount,
        success: ctx.extrinsic ? isExtrinsicSuccess(ctx as ExtrinsicHandlerContext) : true,
    })

    await ctx.store.insert(Transfer, transfer)

    await ctx.store.insert(
        AccountTransfer,
        new AccountTransfer({
            id: `${transfer.id}-from`,
            transfer,
            account: from,
            direction: TransferDirection.FROM,
        })
    )

    if (to) {
        await ctx.store.insert(
            AccountTransfer,
            new AccountTransfer({
                id: `${transfer.id}-to`,
                transfer,
                account: to,
                direction: TransferDirection.TO,
            })
        )
    }
}
