import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Bond, BondType } from '../model'

import { accountManager } from './AccountManager'
import { ItemManager } from './ItemManager'

interface BondData {
    success: boolean
    amount: bigint
    account: string
    type: BondType
}

class BondManager extends ItemManager<Bond> {
    async create(ctx: EventHandlerContext, data: BondData): Promise<Bond> {
        const id = ctx.event.id

        const account = await accountManager.get(ctx, data.account)

        const bond = new Bond({
            id,
            ...this.getMeta(ctx),
            account,
            type: data.type,
            amount: data.amount,
            total: account.activeBond,
            success: data.success,
        })

        await ctx.store.insert(Bond, bond)

        return bond
    }
}

export const bondManager = new BondManager(Bond)
