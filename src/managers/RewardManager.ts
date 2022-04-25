import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Reward, StakingInfo } from '../model'
import { chainManager } from './ChainManager'
import { ChainName } from '../types/custom/chainInfo'
import { accountManager } from './AccountManager'
import { InsertFailedError } from '../common/errors'
import { ItemManager } from './ItemManager'
import { PayeeType } from '../types/custom/stakingData'
import { StorageContext } from '../types/generated/support'
import storage from '../storage'

interface RewardData {
    chain: ChainName
    amount: bigint
    account: string
    era?: number
    validator?: string
}

export class RewardManager extends ItemManager<Reward> {
    async get(ctx: EventHandlerContext, id: string): Promise<Reward | undefined> {
        return await ctx.store.findOne(Reward, id)
    }

    async getByExtrinsic(ctx: EventHandlerContext, extrinsic: string): Promise<Reward[]> {
        return await ctx.store.find(Reward, {
            where: {
                extrinsicHash: extrinsic,
            },
        })
    }

    private async getStakingInfo(ctx: StorageContext, id: string) {
        const controller = await storage.staking.getBonded(ctx, id)
        const payeeData = await storage.staking.getPayee(ctx, id)

        return new StakingInfo({
            controller,
            payee: payeeData?.payee,
            payeeAccount: payeeData?.account,
        })
    }

    async create(ctx: EventHandlerContext, data: RewardData): Promise<Reward> {
        const id = ctx.event.id

        const account = await accountManager.get(ctx, data.account)

        if (!account.stakingInfo) {
            account.stakingInfo = await this.getStakingInfo(ctx, account.id)
        }

        account.totalReward = (account.totalReward || 0n) + data.amount
        if (account.stakingInfo?.payee === PayeeType.STAKED) {
            account.totalBond = (account.totalBond || 0n) + data.amount
        }

        await accountManager.upsert(ctx, account)

        const chain = await chainManager.get(ctx, data.chain)

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

export const rewardManager = new RewardManager()
