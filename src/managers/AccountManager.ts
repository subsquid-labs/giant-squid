import { EventHandlerContext } from '@subsquid/substrate-processor'
import config from '../config'
import { Account } from '../model'
import { Manager } from './Manager'
import { chainManager } from './ChainManager'

export class AccountManager extends Manager<Account> {
    async get(ctx: EventHandlerContext, id: string, data?: Partial<Account>): Promise<Account> {
        let account = await ctx.store.findOne(Account, id, { cache: true })

        if (!account) {
            account = new Account({
                id: id.toString(),
                totalReward: 0n,
                totalBond: 0n,
                totalSlash: 0n,
                chain: await chainManager.get(ctx, config.chainName),
                ...data,
            })

            await ctx.store.insert(Account, account)
        }

        return account
    }
}

export const accountManager = new AccountManager()
