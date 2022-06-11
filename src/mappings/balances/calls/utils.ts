import { AccountTransfer, Transfer, TransferDirection } from '../../../model'
import { CommonHandlerContext } from '../../types/contexts'
import { ActionData } from '../../types/data'
import { getMeta } from '../../util/actions'
import { getOrCreateAccount } from '../../util/entities'

export enum Direction {
    FROM,
    TO,
}

export interface TransferData extends ActionData {
    fromId: string
    toId: string | null
    amount: bigint
    success: boolean
}

export async function saveTransfer(ctx: CommonHandlerContext, data: TransferData) {
    const { fromId, toId, amount, success } = data

    const from = await getOrCreateAccount(ctx, fromId)
    const to = toId ? await getOrCreateAccount(ctx, toId) : null

    const transfer = new Transfer({
        ...getMeta(data),
        from,
        to,
        amount,
        success,
    })

    await ctx.store.insert(transfer)

    await ctx.store.insert(
        new AccountTransfer({
            id: `${transfer.id}-from`,
            transfer,
            account: from,
            direction: TransferDirection.FROM,
        })
    )

    if (to) {
        await ctx.store.insert(
            new AccountTransfer({
                id: `${transfer.id}-to`,
                transfer,
                account: to,
                direction: TransferDirection.TO,
            })
        )
    }
}
