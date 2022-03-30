import { EventHandlerContext } from '@subsquid/substrate-processor'
import config from '../config'
import { Account } from '../model'
import { Manager } from './Manager'
import { chainManager } from './ChainManager'
import { StorageContext } from '../types/generated/support'
import * as modules from '../mappings'

export class AccountManager extends Manager<Account> {
    async get(ctx: EventHandlerContext, id: string, data?: Partial<Account>): Promise<Account> {
        let account = await ctx.store.findOne(Account, id, { cache: true })

        if (!account) {
            const prevCtx: StorageContext = {
                _chain: ctx._chain,
                block: {
                    hash: ctx.block.parentHash,
                },
            }

            const ledger = await modules.dAppsStaking.storage.getLedger(prevCtx, id)

            account = new Account({
                id: id.toString(),
                totalBond: BigInt(ledger || 0),
                totalReward: 0n,
                chain: await chainManager.get(ctx, config.chainName),
                lastUpdateBlock: BigInt(ctx.block.height - 1).valueOf(),
                ...data,
            })

            await ctx.store.insert(Account, account)
        }
        account.lastUpdateBlock = BigInt(ctx.block.height).valueOf()

        return account
    }
}

export const accountManager = new AccountManager()
