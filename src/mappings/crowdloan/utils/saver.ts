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

    let contributor = await contributorManager.get(ctx, `${crowdloan.id}-${account.id}`)
    if (!contributor) {
        contributor = await contributorManager.create(ctx, {
            account,
            crowdloan,
        })
    }

    if (data.success) {
        contributor.amount += BigInt(data.amount)
        await contributorManager.update(ctx, contributor)

        crowdloan.raised += BigInt(data.amount)
        await crowdloanManager.update(ctx, crowdloan)
    }

    await ctx.store.insert(
        Contribution,
        new Contribution({
            id,
            ...getMeta(ctx),
            account,
            amount: data.amount,
            success: data.success,
            crowdloan,
            contributor,
        })
    )
}
