import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Account } from '../model'
import { Manager } from './Manager'

import storage from '../storage'
import { createPrevStorageContext } from '../common/helpers'
import { Store } from '@subsquid/typeorm-store'
import { CommonHandlerContext } from './types'

class AccountManager extends Manager<Account> {
    async get(ctx: CommonHandlerContext, id: string): Promise<Account>
    async get(ctx: CommonHandlerContext, ids: string[]): Promise<Account[]>
    async get(ctx: CommonHandlerContext, idOrIds: string | string[]) {
        const ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds]

        const accounts = await super.get(ctx, ids)

        const idsWithoutAccount = ids.filter((id) => accounts.findIndex((a) => a.id === id) < 0)
        accounts.push(...(await this.create(ctx, idsWithoutAccount)))

        return Array.isArray(idOrIds) ? accounts : accounts[0]
    }

    async create(ctx: CommonHandlerContext, id: string): Promise<Account>
    async create(ctx: CommonHandlerContext, ids: string[]): Promise<Account[]>
    async create(ctx: CommonHandlerContext, idOrIds: string | string[]) {
        const ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds]
        const prevCtx = createPrevStorageContext(ctx)

        // query ledger to check if the account has already bonded balance

        // first we need to know controller id for account
        const controllers = await storage.staking.bonded.getMany(prevCtx, ids)
        const notNullControllers = controllers?.filter((c): c is string => c != null) || []

        // query ledgers and then convert them to map from stash ids
        // that are equaled our initial ids and ledgers values
        const ledgers = await storage.staking.ledger.getMany(prevCtx, notNullControllers)
        const ledgersMap = new Map(ledgers?.map((l) => [l?.stash, l]))

        const accounts = ids.map(
            (id) =>
                new Account({
                    id,
                    totalReward: 0n,
                    activeBond: BigInt(ledgersMap.get(id)?.active || 0),
                    totalSlash: 0n,
                    lastUpdateBlock: ctx.block.height - 1,
                })
        )

        await ctx.store.insert(accounts)

        return Array.isArray(idOrIds) ? accounts : accounts[0]
    }

    async update(ctx: CommonHandlerContext, item: Account): Promise<Account>
    async update(ctx: CommonHandlerContext, items: Account[]): Promise<Account[]>
    async update(ctx: CommonHandlerContext, item: Account | Account[]): Promise<Account | Account[]> {
        if (Array.isArray(item)) {
            item.forEach((i) => (i.lastUpdateBlock = ctx.block.height))
            return await super.update(ctx, item)
        } else {
            item.lastUpdateBlock = ctx.block.height
            return await super.update(ctx, item)
        }
    }
}

export const accountManager = new AccountManager(Account)
