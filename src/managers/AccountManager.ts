import { EventHandlerContext } from '@subsquid/substrate-processor'
import config from '../config'
import { Account } from '../model'
import { Manager } from './Manager'
import { chainManager } from './ChainManager'
import { StakingInfo } from '../model/generated/_stakingInfo'
import storage from '../storage'

export class AccountManager extends Manager<Account> {
    async get(ctx: EventHandlerContext, id: string): Promise<Account> {
        let account = await ctx.store.findOne(Account, id, { cache: true })

        if (!account) {
            account = await this.create(ctx, id)
        }

        account.lastUpdateBlock = BigInt(ctx.block.height).valueOf()

        return account
    }

    async create(ctx: EventHandlerContext, id: string, data?: Partial<Account>): Promise<Account> {
        const prevCtx = {
            _chain: ctx._chain,
            block: {
                ...ctx.block,
                hash: ctx.block.parentHash,
            },
        }

        const ledger = await storage.staking.getLedger(prevCtx, id)
        let stakingInfo: StakingInfo | null = null

        if (ledger) {
            const controller = await storage.staking.getBonded(prevCtx, id)
            const payeeData = await storage.staking.getPayee(prevCtx, id)

            stakingInfo = new StakingInfo({
                controller,
                payee: payeeData?.payee,
                payeeAccount: payeeData?.account,
            })
        }

        const account = new Account({
            id: id.toString(),
            totalReward: 0n,
            totalBond: BigInt(ledger?.active || 0).valueOf(),
            totalSlash: 0n,
            chain: await chainManager.get(ctx, config.chainName),
            lastUpdateBlock: BigInt(ctx.block.height - 1).valueOf(),
            stakingInfo: stakingInfo,
            ...data,
        })

        if (!(await ctx.store.insert(Account, account))) throw new Error(`Failed to insert account ${id}`)

        return account
    }

    async upsert(ctx: EventHandlerContext, item: Account): Promise<Account>
    async upsert(ctx: EventHandlerContext, items: Account[]): Promise<Account[]>
    async upsert(ctx: EventHandlerContext, item: Account | Account[]): Promise<Account | Account[]> {
        if (Array.isArray(item)) {
            item.forEach((i) => (i.lastUpdateBlock = BigInt(ctx.block.height)))
            return await super.upsert(ctx, item)
        } else {
            item.lastUpdateBlock = BigInt(ctx.block.height)
            return await super.upsert(ctx, item)
        }
    }
}

export const accountManager = new AccountManager()
