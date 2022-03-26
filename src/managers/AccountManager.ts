import { EventHandlerContext } from '@subsquid/substrate-processor'
import config from '../config'
import { Account } from '../model'
import { Manager } from './Manager'
import { chainManager } from './ChainManager'
import { StakingInfo } from '../model/generated/_stakingInfo'
import * as modules from '../mappings'

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
                stakingInfo: new StakingInfo(),
                lastUpdateBlock: BigInt(ctx.block.height),
                ...data,
            })

            await ctx.store.insert(Account, account)
        } else {
            account.lastUpdateBlock = BigInt(ctx.block.height)
        }

        return account
    }

    async updateStakingInfo(ctx: EventHandlerContext, account: Account): Promise<void> {
        const controller = await modules.staking.storage.getBonded(ctx, account.id)
        const payeeData = await modules.staking.storage.getPayee(ctx, account.id)

        account.stakingInfo = new StakingInfo({
            controller,
            payee: payeeData?.payee,
            payeeAccount: payeeData?.account,
        })

        ctx.store.save(account)
    }
}

export const accountManager = new AccountManager()
