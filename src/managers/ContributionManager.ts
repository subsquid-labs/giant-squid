import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Contribution } from '../model'
import { accountManager } from './AccountManager'
import { InsertFailedError } from '../common/errors'
import { ItemManager } from './ItemManager'
import { crowdloanManager } from './CrowdloanManager'

interface ContributionData {
    success: boolean
    amount: bigint
    account: string
    paraId: number
}

class ContributionManager extends ItemManager<Contribution> {
    async create(ctx: EventHandlerContext, data: ContributionData): Promise<Contribution> {
        const id = ctx.event.id

        const account = await accountManager.get(ctx, data.account)

        const crowdloan = await crowdloanManager.getByParaId(ctx, data.paraId)

        const contribution = new Contribution({
            id,
            ...this.getMeta(ctx),
            account,
            amount: data.amount,
            success: data.success,
            crowdloan,
        })

        if (!(await ctx.store.insert(Contribution, contribution))) throw new InsertFailedError(Contribution.name, id)

        return contribution
    }
}

export const contributionManager = new ContributionManager(Contribution)
