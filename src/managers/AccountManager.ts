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
            const prevCtx = {
                _chain: ctx._chain,
                block: {
                    ...ctx.block,
                    hash: ctx.block.parentHash,
                },
            }

            const ledger = await modules.staking.storage.getLedger(prevCtx, id)
            let stakingInfo: StakingInfo | null = null

            if (ledger) {
                const controller = await modules.staking.storage.getBonded(prevCtx, id)
                const payeeData = await modules.staking.storage.getPayee(prevCtx, id)

                stakingInfo = new StakingInfo({
                    controller,
                    payee: payeeData?.payee,
                    payeeAccount: payeeData?.account,
                })
            }

            account = new Account({
                id: id.toString(),
                totalReward: 0n,
                totalBond: BigInt(ledger?.active || 0).valueOf(),
                totalSlash: 0n,
                chain: await chainManager.get(ctx, config.chainName),
                lastUpdateBlock: BigInt(ctx.block.height - 1).valueOf(),
                stakingInfo: stakingInfo,
                ...data,
            })

            await ctx.store.insert(Account, account)
        }
        
        account.lastUpdateBlock = BigInt(ctx.block.height).valueOf()

        return account
    }

    // async updateStakingInfo(ctx: EventHandlerContext, account: Account): Promise<void> {
    //     const controller = await modules.staking.storage.getBonded(ctx, account.id)
    //     const payeeData = await modules.staking.storage.getPayee(ctx, account.id)

    //     account.stakingInfo = new StakingInfo({
    //         controller,
    //         payee: payeeData?.payee,
    //         payeeAccount: payeeData?.account,
    //     })

    //     ctx.store.save(account)
    // }
}

export const accountManager = new AccountManager()
