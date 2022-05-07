import { EventHandlerContext } from '@subsquid/substrate-processor'
import {
    eraManager,
    eraValidatorManager,
    EraNominatorData,
    EraValidatorData,
    eraNominatorManager,
    eraStakingPairManager,
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
    const { validatorsData, nominatorsData, links } = stakingData

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

    const nominators = await eraNominatorManager.create(
        ctx,
        nominatorsData.map((data) => ({ era, ...data }))
    )

    for (const link of links) {
        const validator = validators.find((v) => v.stash.id === link.validatorId)
        const nominator = nominators.find((v) => v.stash.id === link.nominatorId)
        if (!nominator || !validator) {
            console.warn(
                `Warning: Can't create staking pair for validator: ${link.validatorId} and nominator: ${link.nominatorId} in era ${era.index} at block ${ctx.block.height}`
            )
            continue
        }

        await eraStakingPairManager.create(ctx, {
            nominator,
            validator,
            era,
            vote: link.vote,
        })
    }

    await eraManager.update(ctx, era)
}

async function getStakingData(ctx: EventHandlerContext, era: number) {
    const validatorsData: Omit<EraValidatorData, 'era'>[] = []
    const nominatorsData: Omit<EraNominatorData, 'era'>[] = []
    const links: { nominatorId: string; validatorId: string; vote: bigint }[] = []

    const validatorIds = await storage.session.getValidators(ctx)
    if (!validatorIds) {
        console.warn(`Warning: Validators for era ${era} not found at block ${ctx.block.height}`)
        return
    }

    for (const validatorId of validatorIds) {
        const validatorInfo = await storage.staking.getErasStakers(ctx, validatorId, era)
        if (!validatorInfo) {
            console.warn(`Warning: Missing info for validator in era ${era} at block ${ctx.block.height}`)
            continue
        }

        validatorsData.push({
            stash: validatorId,
            totalBonded: validatorInfo.total,
            selfBonded: validatorInfo.own,
        })

        for (const nominatorInfo of validatorInfo.nominators) {
            const { id: nominatorId, vote } = nominatorInfo

            if (!nominatorsData.find((data) => data.stash === nominatorId)) {
                const nominatorData = await getNominatorData(ctx, nominatorId, era)
                if (!nominatorData) continue

                nominatorsData.push({
                    stash: nominatorId,
                })
            }

            links.push({
                validatorId,
                nominatorId,
                vote,
            })
        }
    }

    return {
        validatorsData,
        nominatorsData,
        links,
    }
}

async function getNominatorData(ctx: EventHandlerContext, nominatorId: string, era: number) {
    const nomanatorController = await storage.staking.getBonded(ctx, nominatorId)
    if (!nomanatorController) {
        console.warn(`Warning: Missing controller for nomanator in era ${era} at block ${ctx.block.height}`)
        return
    }

    const nominatorLedger = await storage.staking.getLedger(ctx, nomanatorController)
    if (!nominatorLedger) {
        console.warn(`Warning: Missing ledger for nomanator in era ${era} at block ${ctx.block.height}`)
        return
    }

    return {
        era,
        stash: nominatorId,
        bonded: nominatorLedger.active,
    }
}
