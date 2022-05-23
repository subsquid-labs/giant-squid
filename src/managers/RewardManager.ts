import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Reward } from '../model'
import { accountManager } from './AccountManager'
import { InsertFailedError } from '../common/errors'
import { ItemManager } from './ItemManager'

interface RewardData {
    amount: bigint
    account: string
    era?: number
    validator?: string
}

class RewardManager extends ItemManager<Reward> {
    async create(ctx: EventHandlerContext, data: RewardData): Promise<Reward> {
        const id = ctx.event.id

        const account = await accountManager.get(ctx, data.account)

        const reward = new Reward({
            id,
            ...this.getMeta(ctx),
            account,
            amount: data.amount,
            total: account.totalReward,
        })

        if (!(await ctx.store.insert(Reward, reward))) throw new InsertFailedError(Reward.name, id)

        return reward
    }
}

export const rewardManager = new RewardManager(Reward)
