import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Reward } from '../model'
import { chainManager } from './ChainManager'
import { ChainName } from '../types/custom/chainInfo'
import { accountManager } from './AccountManager'
import { InsertFailedError } from '../common/errors'
import { ItemManager } from './ItemManager'

interface RewardData {
    chain: ChainName
    amount: bigint
    account: string
    era?: number
    validator?: string
}

export class RewardManager extends ItemManager<Reward> {
    async create(ctx: EventHandlerContext, data: RewardData): Promise<Reward> {
        const id = ctx.event.id

        const chain = await chainManager.get(ctx, data.chain)
        const account = await accountManager.get(ctx, data.account)

        const reward = new Reward({
            id,
            ...this.getMeta(ctx),
            account,
            amount: data.amount,
            chain,
            total: account.totalReward,
        })

        if (!(await ctx.store.insert(Reward, reward))) throw new InsertFailedError(Reward.name, id)

        return reward
    }
}

export const rewardManager = new RewardManager(Reward)
