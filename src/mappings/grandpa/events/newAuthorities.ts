import { EventHandlerContext } from '@subsquid/substrate-processor'
import {
    eraManager,
    eraValidatorManager,
    EraNominatorData,
    EraValidatorData,
    eraNominatorManager,
    eraStakingPairManager,
    EraStakingPairData,
} from '../../../managers'
import storage from '../../../storage'

export async function handleNewAuthorities(ctx: EventHandlerContext) {
    const activeEraData = await storage.staking.getActiveEra(ctx)
    const currentEraData = await storage.staking.getCurrentEra(ctx)
    //prefered to use ActiveEra because CurrentEra can return next planed era
    const storageEraData = activeEraData || currentEraData

    if (!storageEraData || storageEraData?.index == null) {
        console.warn(`Warning: Unknown era at block ${ctx.block.height}`)
        return
    }

    if (await eraManager.getByIndex(ctx, storageEraData.index)) {
        console.warn(`Warning: Era ${storageEraData.index} has been already proceed at block ${ctx.block.height}`)
        return
    }

    const stakingData = await getStakingData(ctx, storageEraData.index)
    if (!stakingData) return
    const { validatorsData, nominatorsData, pairsData } = stakingData

    const era = await eraManager.create(ctx, {
        index: storageEraData.index,
        timestamp: activeEraData?.timestamp,
        validatorsCount: validatorsData.length,
        nominatorsCount: nominatorsData.length,
        total: validatorsData.reduce((total, validator) => (total += BigInt(validator.totalBonded)), 0n),
    })

    const validators = await eraValidatorManager.create(
        ctx,
        validatorsData.map((data) => ({ era, ...data }))
    )
    const validatorsMap = new Map(validators.map((v) => [v.id, v]))

    const nominators = await eraNominatorManager.create(
        ctx,
        nominatorsData.map((data) => ({ era, ...data }))
    )
    const nominatorsMap = new Map(nominators.map((n) => [n.id, n]))

    const pairsDataWithEntities: Set<EraStakingPairData> = new Set()
    for (const pair of pairsData) {
        const validator = validatorsMap.get(pair.validatorId)
        const nominator = nominatorsMap.get(pair.nominatorId)
        if (!nominator || !validator) {
            console.warn(
                `Warning: Can't create staking pair for validator: ${pair.validatorId} and nominator: ${pair.nominatorId} in era ${era.index} at block ${ctx.block.height}`
            )
            continue
        }

        pairsDataWithEntities.add({
            nominator,
            validator,
            era,
            vote: pair.vote,
        })
    }

    await eraStakingPairManager.create(ctx, [...pairsDataWithEntities])
}

async function getStakingData(ctx: EventHandlerContext, era: number) {
    const validatorsData: Map<string, Omit<EraValidatorData, 'era'>> = new Map()
    const nominatorsData: Map<string, Omit<EraNominatorData, 'era'>> = new Map()
    const pairsData: Set<{ nominatorId: string; validatorId: string; vote: bigint }> = new Set()

    const validatorIds = await storage.session.getValidators(ctx)
    if (!validatorIds) {
        console.warn(`Warning: Validators for era ${era} not found at block ${ctx.block.height}`)
        return
    }
    const validatorInfos = await storage.staking.erasStakers.getMany(
        ctx,
        validatorIds.map((id) => [id, era])
    )
    if (!validatorInfos) {
        console.warn(`Warning: Missing info for validators in era ${era} at block ${ctx.block.height}`)
        return
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
                validatorId,
                nominatorId,
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
