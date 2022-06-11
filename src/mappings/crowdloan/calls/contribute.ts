import { UnknownVersionError } from '../../../common/errors'
import { getOriginAccountId } from '../../../common/helpers'
import { CrowdloanContributeCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext, CommonHandlerContext } from '../../types/contexts'
import { ActionData } from '../../types/data'
import { getMeta } from '../../util/actions'
import { Contribution, Contributor } from '../../../model'
import { getLastCrowdloan, getOrCreateAccount } from '../../util/entities'
import assert from 'assert'

export interface CallData {
    paraId: number
    amount: bigint
}

function getCallData(ctx: CallContext): CallData {
    const call = new CrowdloanContributeCall(ctx)
    if (call.isV9010) {
        const { index, value } = call.asV9010
        return {
            paraId: index,
            amount: value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleContribute(ctx: CallHandlerContext) {
    const data = getCallData(ctx)

    await saveContribution(ctx, {
        id: ctx.call.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.extrinsic.hash,
        accountId: getOriginAccountId(ctx.call.origin),
        amount: data.amount,
        paraId: data.paraId,
        success: ctx.call.success,
    })
}

export interface ContributionData extends ActionData {
    paraId: number
    amount: bigint
    accountId: string
    success: boolean
}

export async function saveContribution(ctx: CommonHandlerContext, data: ContributionData) {
    const { accountId, paraId, amount, success } = data

    const account = await getOrCreateAccount(ctx, accountId)

    const crowdloan = await getLastCrowdloan(ctx, paraId)
    assert(crowdloan != null, `Missing crowdloan ${paraId}`)

    let contributor = await ctx.store.get(Contributor, `${crowdloan.id}-${account.id}`)
    if (!contributor) {
        contributor = new Contributor({
            id: `${crowdloan.id}-${account.id}`,
            account,
            crowdloan,
            amount: 0n,
        })
        await ctx.store.insert(contributor)
    }

    if (success) {
        contributor.amount += BigInt(amount)
        await ctx.store.save(contributor)

        crowdloan.raised += BigInt(amount)
        await ctx.store.save(crowdloan)
    }

    await ctx.store.insert(
        new Contribution({
            ...getMeta(data),
            account,
            amount,
            success,
            crowdloan,
            contributor,
        })
    )
}
