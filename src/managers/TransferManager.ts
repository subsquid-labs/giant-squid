import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Transfer } from '../model'
import { accountManager } from './AccountManager'
import { InsertFailedError } from '../common/errors'
import { ItemManager } from './ItemManager'

interface TransferData {
    success: boolean
    amount: bigint
    from: string
    to: string
}

class TransferManager extends ItemManager<Transfer> {
    async get(ctx: EventHandlerContext, id: string): Promise<Transfer | undefined> {
        return await ctx.store.findOne(Transfer, id, { cache: true })
    }

    async create(ctx: EventHandlerContext, data: TransferData): Promise<Transfer> {
        const id = ctx.event.id

        const from = await accountManager.get(ctx, data.from)
        const to = await accountManager.get(ctx, data.to)

        const transfer = new Transfer({
            id,
            ...this.getMeta(ctx),
            from,
            to,
            amount: data.amount,
        })

        if (!(await ctx.store.insert(Transfer, transfer))) throw new InsertFailedError(Transfer.name, id)

        return transfer
    }
}

export const transferManager = new TransferManager(Transfer)
