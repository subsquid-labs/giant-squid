import { EventHandlerContext } from '@subsquid/substrate-processor'
import { InsertFailedError } from '../common/errors'
import { Contributor } from '../model'
import { accountManager } from './AccountManager'
import { crowdloanManager } from './CrowdloanManager'
import { Manager } from './Manager'

interface ContributorData {
    crowdloan: string
    account: string
}

export class ContributorManager extends Manager<Contributor> {
    async create(ctx: EventHandlerContext, data: ContributorData) {
        const account = await accountManager.get(ctx, data.account)
        const crowdloan = await crowdloanManager.get(ctx, data.crowdloan)

        const id = `${crowdloan?.id}-${account.id}`

        const contributor = new Contributor({
            id,
            crowdloan,
            account,
            amount: 0n,
        })

        if (!(await ctx.store.insert(Contributor, contributor))) throw new InsertFailedError(Contributor.name, id)

        return contributor
    }
}

export const contributorManager = new ContributorManager(Contributor)
