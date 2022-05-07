import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Account } from '../model'
import { Manager } from './Manager'

import storage from '../storage'
import { createPrevStorageContext } from '../common/helpers'

class AccountManager extends Manager<Account> {
    async get(ctx: EventHandlerContext, id: string): Promise<Account> {
        let account = await super.get(ctx, id)

        if (!account) {
            account = await this.create(ctx, id)
        }

        account.lastUpdateBlock = BigInt(ctx.block.height).valueOf()

        return account
    }

    async create(ctx: EventHandlerContext, id: string): Promise<Account> {
        const prevCtx = createPrevStorageContext(ctx)

        //query ledger to check if the account has already bonded balance
        const controller = await storage.staking.getBonded(prevCtx, id)
        const ledger = controller ? await storage.staking.getLedger(prevCtx, controller) : null

        const account = new Account({
            id,
            totalReward: 0n,
            activeBond: BigInt(ledger?.active || 0).valueOf(),
            totalSlash: 0n,
            lastUpdateBlock: BigInt(ctx.block.height - 1).valueOf(),
        })

        if (!(await ctx.store.insert(Account, account))) throw new Error(`Failed to insert account ${id}`)

        return account
    }

    async update(ctx: EventHandlerContext, item: Account): Promise<Account>
    async update(ctx: EventHandlerContext, items: Account[]): Promise<Account[]>
    async update(ctx: EventHandlerContext, item: Account | Account[]): Promise<Account | Account[]> {
        if (Array.isArray(item)) {
            item.forEach((i) => (i.lastUpdateBlock = BigInt(ctx.block.height)))
            return await super.update(ctx, item)
        } else {
            item.lastUpdateBlock = BigInt(ctx.block.height)
            return await super.update(ctx, item)
        }
    }
}

export const accountManager = new AccountManager(Account)
