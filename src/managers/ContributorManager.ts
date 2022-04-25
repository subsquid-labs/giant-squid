import { EventHandlerContext } from '@subsquid/substrate-processor'
import { InsertFailedError } from '../common/errors'
import { Contributor } from '../model'
import { accountManager } from './AccountManager'
import { crowdloanManager } from './CrowdloanManager'
import { Manager } from './Manager'

interface ContributorData {
    paraId: number
    account: string
}

export class ContributorManager extends Manager<Contributor> {
    async get(ctx: EventHandlerContext, id: string): Promise<Contributor | undefined> {
        return await ctx.store.findOne(Contributor, id)
    }

    async create(ctx: EventHandlerContext, data: ContributorData) {
        const account = await accountManager.get(ctx, data.account)
        const crowdloan = await crowdloanManager.get(ctx, data.paraId)
        const id = `${crowdloan.id}-${account.id}`

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

export const contributorManager = new ContributorManager()
