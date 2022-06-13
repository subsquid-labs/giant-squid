import { UnknownVersionError } from '../../../../common/errors'
import { encodeId, saturatingSumBigInt } from '../../../../common/tools'
import { Account, Bond, BondType } from '../../../../model'
import storage from '../../../../storage'
import { ParachainStakingCollatorLeftEvent } from '../../../../types/generated/events'
import { EventContext, EventHandlerContext } from '../../../types/contexts'
import { createPrevStorageContext } from '../../../util/actions'
import { getOrCreateAccount } from '../../../util/entities'
import { saveBond } from '.././utils'

interface EventData {
    account: Uint8Array
    amount: bigint
    newTotal: bigint
}

function getEventData(ctx: EventContext): EventData {
    const event = new ParachainStakingCollatorLeftEvent(ctx)

    if (event.isV900) {
        const [account, amount] = event.asV900
        return {
            account,
            amount,
            newTotal: 0n,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export async function handleCollatorLeft(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    await saveBond(ctx, {
        id: ctx.event.id,
        blockNumber: ctx.block.height,
        timestamp: new Date(ctx.block.timestamp),
        extrinsicHash: ctx.event.extrinsic?.hash,
        accountId: encodeId(data.account),
        amount: data.amount,
        type: BondType.Unbond,
        success: true,
    })

    const prevCtx = createPrevStorageContext(ctx)
    const candidateId = encodeId(data.account)
    const candidate = await getOrCreateAccount(ctx, candidateId)

    let topDelegations = (await storage.parachainStaking.getTopDelegations(prevCtx, candidateId))?.delegations
    let bottomDelegations = (await storage.parachainStaking.getBottomDelegations(prevCtx, candidateId))?.delegations

    if (!topDelegations || !bottomDelegations) {
        const state = await storage.parachainStaking.old.getCollatorState(prevCtx, candidateId)
        topDelegations = state?.topNominators
        bottomDelegations = state?.bottomNominators
    }

    const delegations = topDelegations?.concat(bottomDelegations || [])
    if (!delegations) return

    const delegators: Account[] = new Array(delegations.length)
    const bonds: Bond[] = new Array(delegations.length)
    for (let i = 0; i < delegators.length; i++) {
        delegators[i] = await getOrCreateAccount(ctx, delegations[i].id)
        delegators[i].activeBond = saturatingSumBigInt(delegators[i].activeBond, delegations[i].amount * -1n)
        bonds[i] = new Bond({
            id: `${ctx.event.id}-${i.toString().padStart(4, '0')}`,
            blockNumber: ctx.block.height,
            timestamp: new Date(ctx.block.timestamp),
            extrinsicHash: ctx.event.extrinsic?.hash,
            account: delegators[i],
            candidate: candidate.id,
            amount: delegations[i].amount,
            type: BondType.Unbond,
            success: true,
        })
    }

    await ctx.store.save(delegators)
    await ctx.store.save(bonds)
}
