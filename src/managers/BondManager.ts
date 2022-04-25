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
    async get(ctx: EventHandlerContext, id: string): Promise<Bond | undefined> {
        return await ctx.store.findOne(Bond, id, { cache: true })
    }

    async create(ctx: EventHandlerContext, data: BondData): Promise<Bond> {
        const id = ctx.event.id

        const account = await accountManager.get(ctx, data.account)
        if (data.success) {
            account.totalBond =
                data.type === BondType.Bond
                    ? BigInt(account.totalBond || 0n) + BigInt(data.amount)
                    : BigInt(account.totalBond || 0n) - BigInt(data.amount)
            account.totalBond = account.totalBond > 0n ? account.totalBond : 0n
            await accountManager.upsert(ctx, account)
        }

        const chain = await chainManager.get(ctx, data.chain)

        const bond = new Bond({
            id,
            ...this.getMeta(ctx),
            account,
            chain,
            type: data.type,
            total: account.totalBond,
        })

        if (!(await ctx.store.insert(Bond, bond))) throw new InsertFailedError(Bond.name, id)

        return bond
    }
}

export const bondManager = new BondManager()
