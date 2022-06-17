import assert from 'assert'
import { Era, EraNominator, EraNomination, EraValidator } from '../../../model'
import storage from '../../../storage'
import { EventHandlerContext } from '../../types/contexts'
import { createPrevStorageContext } from '../../util/actions'
import { getOrCreateStakers } from '../../util/entities'

interface PairData {
    validator: string
    nominator: string
    vote: bigint
}

export async function handleNewAuthorities(ctx: EventHandlerContext) {
    const activeEraData = await storage.staking.getActiveEra(ctx)
    const currentEraData = await storage.staking.getCurrentEra(ctx)
    //prefered to use ActiveEra because CurrentEra can return next planed era
    const storageEraData = activeEraData || currentEraData

    if (!storageEraData || storageEraData?.index == null) {
        return ctx.log.warn(`Unknown era`)
    }

    if ((await ctx.store.count(Era, { id: storageEraData.index.toString() })) > 0) {
        return ctx.log.warn(`Era ${storageEraData.index} has been already proceed`)
    }

    const era = new Era({
        id: storageEraData.index.toString(),
        index: storageEraData.index,
        startedAt: ctx.block.height,
        timestamp: new Date(activeEraData?.timestamp || ctx.block.timestamp),
    })

    const stakingData = await getStakingData(ctx, era)
    if (!stakingData) return
    const { validators, nominators, nominations } = stakingData

    era.validatorsCount = validators.length
    era.nominatorsCount = nominators.length
    era.total = validators.reduce((total, validator) => (total += BigInt(validator.totalBonded)), 0n)
    await ctx.store.insert(era)

    await ctx.store.save(validators)
    await ctx.store.save(nominators)
    await ctx.store.save(nominations)
}

async function getStakingData(ctx: EventHandlerContext, era: Era) {
    const validators: Map<string, EraValidator> = new Map()

    const validatorIds = await storage.session.getValidators(ctx)
    if (!validatorIds) {
        return ctx.log.warn(`Validators for era ${era} not found`)
    }

    const prevCtx = createPrevStorageContext(ctx)

    const validatorsData = await storage.staking.getEraStakersData(
        prevCtx,
        validatorIds.map((id) => [id, era.index] as [string, number])
    )
    if (!validatorsData) {
        return ctx.log.warn(`Missing info for validators in era ${era}`)
    }

    const validatorStakers = new Map((await getOrCreateStakers(ctx, 'Stash', validatorIds)).map((s) => [s.id, s]))
    const nominatorIds: string[] = []
    const nominationsData: PairData[] = []

    for (let i = 0; i < validatorIds.length; i++) {
        const validatorId = validatorIds[i]
        const validatorData = validatorsData[i]
        if (!validatorData) {
            ctx.log.warn(`Missing info for validator ${validatorId} in era ${era}`)
            continue
        }

        const staker = validatorStakers.get(validatorId)
        if (!staker) {
            ctx.log.warn(`Missing info for staker ${validatorId} in era ${era}`)
            continue
        }

        validators.set(
            validatorId,
            new EraValidator({
                id: `${era.index}-${validatorId}`,
                era,
                staker,
                totalBonded: validatorData.total,
                selfBonded: validatorData.own,
            })
        )

        for (const nomination of validatorData.nominators) {
            nominatorIds.push(nomination.id)
            nominationsData.push({
                nominator: nomination.id,
                validator: validatorId,
                vote: nomination.vote,
            })
        }
    }

    const nominatorStakers = new Map((await getOrCreateStakers(ctx, 'Stash', nominatorIds)).map((s) => [s.id, s]))
    const nominators: Map<string, EraNominator> = new Map()

    for (const nominatorId of nominatorIds) {
        const staker = nominatorStakers.get(nominatorId)
        if (!staker) {
            ctx.log.warn(`Missing info for staker ${nominatorId} in era ${era}`)
            continue
        }

        nominators.set(
            nominatorId,
            new EraNominator({
                id: `${era.index}-${nominatorId}`,
                era,
                staker,
                bonded: staker.activeBond,
            })
        )
    }

    const nominations: Map<string, EraNomination> = new Map()

    for (const nominationData of nominationsData) {
        const validator = validators.get(nominationData.validator)
        const nominator = nominators.get(nominationData.nominator)
        assert(validator != null && nominator != null)

        const id = `${era.index}-${validator.stakerId}-${nominator.stakerId}`
        nominations.set(
            id,
            new EraNomination({
                id,
                era,
                validator,
                nominator,
                vote: nominationData.vote,
            })
        )
    }

    return {
        nominators: [...nominators.values()],
        validators: [...validators.values()],
        nominations: [...nominations.values()],
    }
}
