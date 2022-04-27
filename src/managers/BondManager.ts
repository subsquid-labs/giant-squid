import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Bond, BondType } from '../model'
import { chainManager } from './ChainManager'
import { ChainName } from '../types/custom/chainInfo'
import { accountManager } from './AccountManager'
import { InsertFailedError } from '../common/errors'
import { ItemManager } from './ItemManager'

interface BondData {
    chain: ChainName
    success: boolean
    amount: bigint
    account: string
    type: BondType
}

export class BondManager extends ItemManager<Bond> {
    async create(ctx: EventHandlerContext, data: BondData): Promise<Bond> {
        const id = ctx.event.id

        const account = await accountManager.get(ctx, data.account)
        const chain = await chainManager.get(ctx, data.chain)

        const bond = new Bond({
            id,
            ...this.getMeta(ctx),
            account,
            chain,
            type: data.type,
            amount: data.amount,
            total: account.totalBond,
            success: data.success,
        })

        if (!(await ctx.store.insert(Bond, bond))) throw new InsertFailedError(Bond.name, id)

        await accountManager.update(ctx, account)

        return bond
    }
}

export const bondManager = new BondManager(Bond)
