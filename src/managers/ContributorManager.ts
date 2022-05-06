import { EventHandlerContext } from '@subsquid/substrate-processor'
import { InsertFailedError } from '../common/errors'
import { Account, Contributor, Crowdloan } from '../model'
import { accountManager } from './AccountManager'
import { crowdloanManager } from './CrowdloanManager'
import { Manager } from './Manager'

interface ContributorData {
    crowdloan: string | Crowdloan
    account: string | Account
}

class ContributorManager extends Manager<Contributor> {
    createId(crowdloan: string, account: string) {
        return `${crowdloan}-${account}`
    }

    async create(ctx: EventHandlerContext, data: ContributorData) {
        const account = typeof data.account === 'string' ? await accountManager.get(ctx, data.account) : data.account
        const crowdloan =
            typeof data.crowdloan === 'string' ? await crowdloanManager.get(ctx, data.crowdloan) : data.crowdloan

        const id = this.createId(crowdloan?.id || 'unknown', account.id)

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
