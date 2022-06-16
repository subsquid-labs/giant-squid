import { UnknownVersionError } from '../../../common/errors'
import { ParachainStakingNewRoundEvent } from '../../../types/generated/events'
import { EventContext, EventHandlerContext } from '../../types/contexts'
import { Round, RoundCollator, RoundNomination, RoundNominator } from '../../../model'
import assert from 'assert'
import storage from '../../../storage'
import { getCollatorsData, getNominatorsData } from '../../util/stakers'
import { getOrCreateStakers } from '../../util/entities'
import { DefaultCollatorCommission } from '../../util/consts'

export interface EventData {
    startingBlock: number
    round: number
    selectedCollatorsNumber: number
    totalBalance: bigint
}

function getEventData(ctx: EventContext): EventData {
    const event = new ParachainStakingNewRoundEvent(ctx)

    if (event.isV49) {
        const [startingBlock, round, selectedCollatorsNumber, totalBalance] = event.asV49
        return { startingBlock, round, selectedCollatorsNumber, totalBalance }
    } else if (event.isV1300) {
        return event.asV1300
    }
    throw new UnknownVersionError(event.constructor.name)
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export async function handleNewRound(ctx: EventHandlerContext) {
    const roundData = getEventData(ctx)

    const round = new Round({
        id: roundData.round.toString(),
        index: roundData.round,
        timestamp: new Date(ctx.block.timestamp),
        startedAt: ctx.block.height,
        collatorsCount: roundData.selectedCollatorsNumber,
        total: roundData.totalBalance,
    })

    await ctx.store.insert(round)

    const collatorIds = await storage.parachainStaking.getSelectedCandidates(ctx)
    if (!collatorIds) return

    const collatorsData = await getCollatorsData(ctx, collatorIds)
    if (!collatorsData) return

    const collators = new Map<string, RoundCollator>()
    const collatorStakers = await getOrCreateStakers(ctx, collatorIds)

    const nominatorIds = new Array<string>()
    const delegationsData = new Array<{ vote: bigint; nominatorId: string; collatorId: string }>()
    for (const collatorData of collatorsData) {
        if (!collatorData || collators.has(collatorData.id)) continue

        let totalBond = collatorData.bond

        for (const nomination of collatorData.nominators) {
            totalBond += nomination.amount
            nominatorIds.push(nomination.id)
            delegationsData.push({ vote: nomination.amount, nominatorId: nomination.id, collatorId: collatorData.id })
        }

        const staker = collatorStakers?.find((s) => s.id === collatorData.id)
        assert(staker != null)

        collators.set(
            collatorData.id,
            new RoundCollator({
                id: `${round.index}-${collatorData.id}`,
                round,
                staker,
                selfBond: collatorData.bond,
                totalBond: totalBond,
                commission: DefaultCollatorCommission,
                nominatorsCount: collatorData.nominators.length,
            })
        )
    }

    await ctx.store.save([...collators.values()])

    const nominatorsData = await getNominatorsData(ctx, nominatorIds)
    if (!nominatorsData) return

    const nominators = new Map<string, RoundNominator>()

    const nominatorStakers = await getOrCreateStakers(ctx, nominatorIds)

    for (const nominatorData of nominatorsData) {
        if (!nominatorData || nominators.has(nominatorData.id)) continue

        const staker = nominatorStakers?.find((s) => s.id === nominatorData.id)
        assert(staker != null)

        nominators.set(
            nominatorData.id,
            new RoundNominator({
                id: `${round.index}-${nominatorData.id}`,
                round,
                staker,
                bond: nominatorData.bond,
                collatorsCount: delegationsData.reduce(
                    (count, d) => (d.nominatorId === nominatorData.id ? count++ : count),
                    0
                ),
            })
        )
    }

    await ctx.store.save([...nominators.values()])

    const delegations = new Array<RoundNomination>(delegationsData.length)

    for (let i = 0; i < delegationsData.length; i++) {
        const collator = collators.get(delegationsData[i].collatorId)
        const nominator = nominators.get(delegationsData[i].nominatorId)
        assert(collator != null && nominator != null)

        delegations[i] = new RoundNomination({
            id: `${round.index}-${collator.staker.id}-${nominator.staker.id}`,
            round,
            collator,
            nominator,
            vote: delegationsData[i].vote,
        })
    }

    await ctx.store.save(delegations)
}
