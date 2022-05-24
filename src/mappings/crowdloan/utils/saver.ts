import { EventHandlerContext } from '@subsquid/substrate-processor'
import { getMeta } from '../../../common/helpers'
import { accountManager, contributorManager, crowdloanManager } from '../../../managers'
import { Contribution } from '../../../model'
import { ContributionData } from './types'

export async function saveContribution(ctx: EventHandlerContext, data: ContributionData) {
    const id = ctx.event.id

    const account = await accountManager.get(ctx, data.account)

    const crowdloan = await crowdloanManager.getByParaId(ctx, data.paraId)
    if (!crowdloan) return

    const contribution = new Contribution({
        id,
        ...getMeta(ctx),
        account,
        amount: data.amount,
        success: data.success,
        crowdloan,
    })

    await ctx.store.insert(Contribution, contribution)

    if (data.success) {
        const account = contribution.account

        let contributor = await contributorManager.get(ctx, `${crowdloan.id}-${account.id}`)
        if (!contributor) {
            contributor = await contributorManager.create(ctx, {
                account,
                crowdloan,
            })
        }

        contributor.amount += BigInt(contribution.amount || 0)
        await contributorManager.update(ctx, contributor)

        crowdloan.raised += BigInt(contribution.amount || 0)
        await crowdloanManager.update(ctx, crowdloan)
    }
}
