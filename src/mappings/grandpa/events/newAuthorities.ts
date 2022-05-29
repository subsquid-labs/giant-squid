import { EventHandlerContext } from '@subsquid/substrate-processor'
import { accountManager, eraManager } from '../../../managers'
import { Era, EraNominator, EraStakingPair, EraValidator } from '../../../model'
import storage from '../../../storage'

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

    if (await eraManager.getByIndex(ctx, storageEraData.index)) {
        return console.warn(
            `Warning: Era ${storageEraData.index} has been already proceed at block ${ctx.block.height}`
        )
    }

    const stakingData = await getStakingData(ctx, storageEraData.index)
    if (!stakingData) return
    const { validatorsData, nominatorsData, pairsData } = stakingData

    const era = await eraManager.create(ctx, {
        index: storageEraData.index,
        startedAt: ctx.block.height,
        timestamp: activeEraData?.timestamp,
        validatorsCount: validatorsData.length,
        nominatorsCount: nominatorsData.length,
        total: validatorsData.reduce((total, validator) => (total += BigInt(validator.totalBonded)), 0n),
    })

    const validators = await createValidators(ctx, era, validatorsData)
    const nominators = await createNominators(ctx, era, nominatorsData)

    const pairs = await Promise.all(
        pairsData.map(async (p) => {
            return new EraStakingPair({
                id: `${era.index}-${p.validator}-${p.nominator}`,
                validator: validators.get(p.validator),
                nominator: nominators.get(p.nominator),
                vote: p.vote,
                era,
            })
        })
    )

    await ctx.store.save(pairs, { chunk: 500 })
}

async function createValidators(ctx: EventHandlerContext, era: Era, data: ValidatorData[]) {
    const tuples: [string, EraValidator][] = await Promise.all(
        data.map(async (v) => [
            v.stash,
            new EraValidator({
                id: `${era.index}-${v.stash}`,
                stash: await accountManager.get(ctx, v.stash),
                totalBonded: v.totalBonded,
                selfBonded: v.selfBonded,
                era,
            }),
        ])
    )
    const map = new Map(tuples)
    await ctx.store.save([...map.values()], { chunk: 500 })
    return map
}

async function createNominators(ctx: EventHandlerContext, era: Era, data: NominatorData[]) {
    const tuples: [string, EraNominator][] = await Promise.all(
        data.map(async (n) => {
            const stash = await accountManager.get(ctx, n.stash)
            return [
                n.stash,
                new EraNominator({
                    id: `${era.index}-${n.stash}`,
                    stash,
                    bonded: stash.activeBond,
                    era,
                }),
            ]
        })
    )
    const map = new Map(tuples)
    await ctx.store.save([...map.values()], { chunk: 500 })
    return map
}

async function getStakingData(ctx: EventHandlerContext, era: number) {
    const validatorsData: Map<string, ValidatorData> = new Map()
    const nominatorsData: Map<string, NominatorData> = new Map()
    const pairsData: Set<PairData> = new Set()

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

            pairsData.add({
                validator: validatorId,
                nominator: nominatorId,
                vote,
            })
        }
    }

    return {
        validatorsData: [...validatorsData.values()],
        nominatorsData: [...nominatorsData.values()],
        pairsData: [...pairsData],
    }
}
