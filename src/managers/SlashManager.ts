import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Slash } from '../model'
import { chainManager } from './ChainManager'
import { ChainName } from '../types/custom/chainInfo'
import { accountManager } from './AccountManager'
import { InsertFailedError } from '../common/errors'
import { ItemManager } from './ItemManager'

interface SlashData {
    chain: ChainName
    amount: bigint
    account: string
    era: number
    validator?: string
}

export class SlashManager extends ItemManager<Slash> {
    async get(ctx: EventHandlerContext, id: string): Promise<Slash | undefined> {
        return await ctx.store.findOne(Slash, id, { cache: true })
    }

    async create(ctx: EventHandlerContext, data: SlashData): Promise<Slash> {
        const id = ctx.event.id

        const account = await accountManager.get(ctx, data.account)

        account.totalSlash = account.totalSlash + data.amount
        account.totalBond = account.totalBond - data.amount
        account.totalBond = account.totalBond > 0n ? account.totalBond : 0n

        await accountManager.upsert(ctx, account)

        const chain = await chainManager.get(ctx, data.chain)

        const slash = new Slash({
            id,
            ...this.getMeta(ctx),
            account,
            amount: data.amount,
            chain,
            total: account.totalSlash,
        })

        if (!(await ctx.store.insert(Slash, slash))) throw new InsertFailedError(Slash.name, id)

        return slash
    }
}

export const slashManager = new SlashManager()
