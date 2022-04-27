import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Contribution } from '../model'
import { chainManager } from './ChainManager'
import { ChainName } from '../types/custom/chainInfo'
import { accountManager } from './AccountManager'
import { InsertFailedError } from '../common/errors'
import { ItemManager } from './ItemManager'
import { crowdloanManager } from './CrowdloanManager'

interface ContributionData {
    chain: ChainName
    success: boolean
    amount: bigint
    account: string
    paraId: number
}

export class ContributionManager extends ItemManager<Contribution> {
    async create(ctx: EventHandlerContext, data: ContributionData): Promise<Contribution> {
        const id = ctx.event.id

        const account = await accountManager.get(ctx, data.account)

        const chain = await chainManager.get(ctx, data.chain)

        const crowdloan = await crowdloanManager.getByParaId(ctx, data.paraId)

        const contribution = new Contribution({
            id,
            ...this.getMeta(ctx),
            account,
            chain,
            amount: data.amount,
            success: data.success,
            crowdloan,
        })

        if (!(await ctx.store.insert(Contribution, contribution))) throw new InsertFailedError(Contribution.name, id)

        return contribution
    }
}

export const contributionManager = new ContributionManager(Contribution)
