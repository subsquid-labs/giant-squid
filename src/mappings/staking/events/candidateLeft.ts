import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { createPrevStorageContext, encodeId, getMeta, saturatingSumBigInt } from '../../../common/helpers'
import { accountManager } from '../../../managers'
import { Account, Bond, BondType } from '../../../model'
import storage from '../../../storage'
import { ParachainStakingCandidateLeftEvent } from '../../../types/generated/events'
import { saveBond } from '../utils/savers'

interface EventData {
    account: Uint8Array
    amount: bigint
    newTotal: bigint
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingCandidateLeftEvent(ctx)

    if (event.isV1001) {
        const [account, amount] = event.asV1001
        return {
            account,
            amount,
            newTotal: 0n,
        }
    } else if (event.isV1300) {
        const { exCandidate: account, unlockedAmount: amount } = event.asV1300
        return {
            account,
            amount,
            newTotal: 0n,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleCandidateLeft: EventHandler = async (ctx) => {
    if (
        ctx.block.events.find(
            (event) =>
                event.extrinsicId === ctx.event.extrinsic?.id &&
                event.name === 'parachainStaking.CandidateLeftCandidate'
        )
    )
        return

    const data = getEventData(ctx)

    await saveBond(ctx, {
        account: encodeId(data.account),
        amount: data.amount,
        type: BondType.Unbond,
        success: true,
    })

    const prevCtx = createPrevStorageContext(ctx)
    const candidateId = encodeId(data.account)
    const candidate = await accountManager.get(ctx, candidateId)

    let topDelegations = (await storage.parachainStaking.getTopDelegations(prevCtx, candidateId))?.delegations
    let bottomDelegations = (await storage.parachainStaking.getBottomDelegations(prevCtx, candidateId))?.delegations

    if (!topDelegations || !bottomDelegations) {
        const state = await storage.parachainStaking.getCandidateState(prevCtx, candidateId)
        topDelegations = state?.topDelegations
        bottomDelegations = state?.bottomDelegations
    }

    const delegations = topDelegations?.concat(bottomDelegations || [])
    if (!delegations) return

    const delegators: Account[] = new Array(delegations.length)
    const bonds: Bond[] = new Array(delegations.length)
    for (let i = 0; i < delegators.length; i++) {
        delegators[i] = await accountManager.get(ctx, delegations[i].id)
        delegators[i].activeBond = saturatingSumBigInt(delegators[i].activeBond, delegations[i].amount * -1n)
        bonds[i] = new Bond({
            id: `ctx.event.id-${i.toString().padStart(4, '0')}`,
            ...getMeta(ctx),
            account: delegators[i],
            candidate: candidate.id,
            amount: delegations[i].amount,
            total: delegators[i].activeBond,
            type: BondType.Unbond,
            success: true,
        })
    }

    await ctx.store.save([...delegators, ...bonds])
}
