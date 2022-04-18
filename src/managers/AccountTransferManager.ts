import { EventHandlerContext } from '@subsquid/substrate-processor'
import { AccountTransfer } from '../model'
import { Manager } from './Manager'

export class AccountTransferManager extends Manager<AccountTransfer> {
    async create(ctx: EventHandlerContext, data: AccountTransfer): Promise<AccountTransfer> {
        const accountTransfer = new AccountTransfer(data)

        await ctx.store.insert(AccountTransfer, accountTransfer)

        return accountTransfer
    }

    get(ctx: EventHandlerContext, id: string): Promise<AccountTransfer | undefined> {
        return ctx.store.findOne(id)
    }
}

export const accountTransferManager = new AccountTransferManager()
