import { Store } from '@subsquid/typeorm-store'
import { Account, Contributor, Crowdloan } from '../model'
import { accountManager } from './AccountManager'
import { crowdloanManager } from './CrowdloanManager'
import { Manager } from './Manager'
import { CommonHandlerContext } from './types'

interface ContributorData {
    crowdloan: string | Crowdloan
    account: string | Account
}

class ContributorManager extends Manager<Contributor> {
    createId(crowdloan: string, account: string) {
        return `${crowdloan}-${account}`
    }

    async create(ctx: CommonHandlerContext, data: ContributorData) {
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

        await ctx.store.insert(contributor)

        return contributor
    }
}

export const contributorManager = new ContributorManager(Contributor)
