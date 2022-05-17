import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Slash } from '../model'
import { accountManager } from './AccountManager'
import { InsertFailedError } from '../common/errors'
import { ItemManager } from './ItemManager'

interface SlashData {
    amount: bigint
    account: string
    era: number
    validator?: string
}

class SlashManager extends ItemManager<Slash> {
    async create(ctx: EventHandlerContext, data: SlashData): Promise<Slash> {
        const id = ctx.event.id

        const account = await accountManager.get(ctx, data.account)

        const slash = new Slash({
            id,
            ...this.getMeta(ctx),
            account,
            amount: data.amount,
            total: account.totalSlash,
        })

        if (!(await ctx.store.insert(Slash, slash))) throw new InsertFailedError(Slash.name, id)

        return slash
    }
}

export const slashManager = new SlashManager(Slash)
