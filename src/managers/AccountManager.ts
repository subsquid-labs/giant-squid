import { EventHandlerContext } from '@subsquid/substrate-processor'
import config from '../config'
import { Account } from '../model'
import { Manager } from './Manager'

export class AccountManager extends Manager<Account> {
    async get(ctx: EventHandlerContext, id: string, data?: Partial<Account>): Promise<Account> {
        let account = await ctx.store.findOne(Account, id, { cache: true })

        if (!account) {
            account = new Account({
                id: id.toString(),
                lastUpdateBlock: BigInt(ctx.block.height - 1).valueOf(),
                totalBond: 0n,
                totalReward: 0n,
                rewards: [],
                bonds: [],
                ...data,
            })

            await ctx.store.insert(Account, account)
        }

        account.lastUpdateBlock = BigInt(ctx.block.height).valueOf()

        return account
    }
}

export const accountManager = new AccountManager()
