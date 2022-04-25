import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Contribution } from '../model'
import { chainManager } from './ChainManager'
import { ChainName } from '../types/custom/chainInfo'
import { accountManager } from './AccountManager'
import { InsertFailedError } from '../common/errors'
import { ItemManager } from './ItemManager'
import { crowdloanManager } from './CrowdloanManager'
import { contributorManager } from './ContributorManager'

interface ContributionData {
    chain: ChainName
    success: boolean
    amount: bigint
    account: string
    paraId: number
}

export class ContributionManager extends ItemManager<Contribution> {
    async get(ctx: EventHandlerContext, id: string): Promise<Contribution | undefined> {
        return await ctx.store.findOne(Contribution, id, { cache: true })
    }

    async create(ctx: EventHandlerContext, data: ContributionData): Promise<Contribution | undefined> {
        const id = ctx.event.id

        const account = await accountManager.get(ctx, data.account)

        const chain = await chainManager.get(ctx, data.chain)

        const crowdloan = await crowdloanManager.get(ctx, data.paraId)
        if (!crowdloan) return undefined

        const contribution = new Contribution({
            id,
            ...this.getMeta(ctx),
            account,
            chain,
            amount: data.amount,
            success: data.success,
        })

        if (data.success) {
            let contributor = await contributorManager.get(ctx, `${crowdloan.id}-${account.id}`)
            if (!contributor) {
                contributor = await contributorManager.create(ctx, {
                    account: account.id,
                    paraId: data.paraId,
                })
            }

            contributor.amount += BigInt(contribution.amount || 0)
            await contributorManager.upsert(ctx, contributor)

            crowdloan.raised += BigInt(contribution.amount || 0)
            await crowdloanManager.upsert(ctx, crowdloan)
        }

        if (!(await ctx.store.insert(Contribution, contribution))) throw new InsertFailedError(Contribution.name, id)

        return contribution
    }
}

export const contributionManager = new ContributionManager()
