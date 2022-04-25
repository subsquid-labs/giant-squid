import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Slash, StakingInfo } from '../model'
import { chainManager } from './ChainManager'
import { ChainName } from '../types/custom/chainInfo'
import { accountManager } from './AccountManager'
import { InsertFailedError } from '../common/errors'
import { ItemManager } from './ItemManager'
import { PayeeType } from '../types/custom/stakingData'
import { getBonded, getPayee } from '../mappings/staking/storage'
import { StorageContext } from '../types/generated/support'

interface SlashData {
    chain: ChainName
    amount: bigint
    account: string
    era?: number
    validator?: string
}

export class SlashManager extends ItemManager<Slash> {
    async get(ctx: EventHandlerContext, id: string): Promise<Slash | undefined> {
        return await ctx.store.findOne(Slash, id, { cache: true })
    }

    private async getStakingInfo(ctx: StorageContext, id: string) {
        const controller = await getBonded(ctx, id)
        const payeeData = await getPayee(ctx, id)

        return new StakingInfo({
            controller,
            payee: payeeData?.payee,
            payeeAccount: payeeData?.account,
        })
    }

    async create(ctx: EventHandlerContext, data: SlashData): Promise<Slash> {
        const id = ctx.event.id

        const account = await accountManager.get(ctx, data.account)

        if (!account.stakingInfo) {
            account.stakingInfo = await this.getStakingInfo(ctx, account.id)
        }

        account.totalSlash = (account.totalSlash || 0n) + data.amount
        if (account.stakingInfo?.payee === PayeeType.STAKED) {
            account.totalBond = (account.totalBond || 0n) + data.amount
        }

        await accountManager.upsert(ctx, account)

        const chain = await chainManager.get(ctx, data.chain)

        const slash = new Slash({
            id,
            ...this.getMeta(ctx),
            account,
            amount: data.amount,
            chain,
            total: account.totalSlash,
        })

        if (!(await ctx.store.insert(Slash, slash))) throw new InsertFailedError(Slash.name, id)

        return slash
    }
}

export const slashManager = new SlashManager()
