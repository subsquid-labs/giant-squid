import { Era, EraNominator, EraStakingPair, EraValidator } from '../../../model'
import storage from '../../../storage'
import { EventHandlerContext } from '../../types/contexts'
import { getOrCreateStaker } from '../../util/entities'

interface ValidatorData {
    stash: string
    totalBonded: bigint
    selfBonded: bigint
}

interface NominatorData {
    stash: string
}

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
        return console.warn(`Warning: Unknown era at block ${ctx.block.height}`)
    }

    if ((await ctx.store.count(Era, { id: storageEraData.index.toString() })) > 0) {
        return console.warn(
            `Warning: Era ${storageEraData.index} has been already proceed at block ${ctx.block.height}`
        )
    }

    const stakingData = await getStakingData(ctx, storageEraData.index)
    if (!stakingData) return
    const { validatorsData, nominatorsData, pairsData } = stakingData

    const era = new Era({
        id: storageEraData.index.toString(),
        index: storageEraData.index,
        startedAt: ctx.block.height,
        timestamp: new Date(activeEraData?.timestamp || ctx.block.timestamp),
        validatorsCount: validatorsData.length,
        nominatorsCount: nominatorsData.length,
        total: validatorsData.reduce((total, validator) => (total += BigInt(validator.totalBonded)), 0n),
    })
    await ctx.store.insert(era)

    const validators = await createValidators(ctx, era, validatorsData)
    const nominators = await createNominators(ctx, era, nominatorsData)

    const pairs = pairsData.map((p) => {
        return new EraStakingPair({
            id: `${era.index}-${p.validator}-${p.nominator}`,
            validator: validators.get(p.validator),
            nominator: nominators.get(p.nominator),
            vote: p.vote,
            era,
        })
    })

    await ctx.store.save(pairs)
}

async function createValidators(ctx: EventHandlerContext, era: Era, data: ValidatorData[]) {
    const tuples: [string, EraValidator][] = (
        await Promise.all(
            data.map(async (v) => {
                const staker = await getOrCreateStaker(ctx, { stashId: v.stash })
                return staker
                    ? [
                          v.stash,
                          new EraValidator({
                              id: `${era.index}-${v.stash}`,
                              staker,
                              totalBonded: v.totalBonded,
                              selfBonded: v.selfBonded,
                              era,
                          }),
                      ]
                    : undefined
            })
        )
    ).filter((t): t is [string, EraValidator] => t != null)
    const map = new Map(tuples)
    await ctx.store.save([...map.values()])
    return map
}

async function createNominators(ctx: EventHandlerContext, era: Era, data: NominatorData[]) {
    const tuples: [string, EraNominator][] = (
        await Promise.all(
            data.map(async (n) => {
                const staker = await getOrCreateStaker(ctx, { stashId: n.stash })
                return staker
                    ? [
                          n.stash,
                          new EraNominator({
                              id: `${era.index}-${n.stash}`,
                              staker,
                              bonded: staker.activeBond,
                              era,
                          }),
                      ]
                    : undefined
            })
        )
    ).filter((t): t is [string, EraNominator] => t != null)
    const map = new Map(tuples)
    await ctx.store.save([...map.values()])
    return map
}

async function getStakingData(ctx: EventHandlerContext, era: number) {
    const validatorsData: Map<string, ValidatorData> = new Map()
    const nominatorsData: Map<string, NominatorData> = new Map()
    const pairsData: Map<string, PairData> = new Map()

    const validatorIds = await storage.session.getValidators(ctx)
    if (!validatorIds) {
        return console.warn(`Warning: Validators for era ${era} not found at block ${ctx.block.height}`)
    }

    const validatorInfos = await storage.staking.erasStakers.getMany(
        ctx,
        validatorIds.map((id) => [id, era])
    )
    if (!validatorInfos) {
        return console.warn(`Warning: Missing info for validators in era ${era} at block ${ctx.block.height}`)
    }

    for (let i = 0; i < validatorIds.length; i++) {
        const validatorId = validatorIds[i]
        const validatorInfo = validatorInfos[i]
        if (!validatorInfo) {
            console.warn(
                `Warning: Missing info for validator ${validatorId} in era ${era} at block ${ctx.block.height}`
            )
            continue
        }

        if (validatorsData.has(validatorId)) continue

        validatorsData.set(validatorId, {
            stash: validatorId,
            totalBonded: validatorInfo.total,
            selfBonded: validatorInfo.own,
        })

        for (const nominatorInfo of validatorInfo.nominators) {
            const { id: nominatorId, vote } = nominatorInfo

            if (!nominatorsData.has(nominatorId)) {
                nominatorsData.set(nominatorId, {
                    stash: nominatorId,
                })
            }

            if (!pairsData.has(`${validatorId}-${nominatorId}`))
                pairsData.set(`${validatorId}-${nominatorId}`, {
                    validator: validatorId,
                    nominator: nominatorId,
                    vote,
                })
        }
    }

    return {
        validatorsData: [...validatorsData.values()],
        nominatorsData: [...nominatorsData.values()],
        pairsData: [...pairsData.values()],
    }
}
