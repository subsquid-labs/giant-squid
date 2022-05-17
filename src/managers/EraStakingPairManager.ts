import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Manager } from './Manager'
import { Era, EraNominator, EraStakingPair, EraValidator } from '../model'
import { eraNominatorManager } from './EraNominatorManager'
import { eraValidatorManager } from './EraValidatorManager'
import { eraManager } from './EraManager'

export interface EraStakingPairData {
    nominator: string | EraNominator
    validator: string | EraValidator
    vote: bigint
    era: number | Era
}

class EraStakingPairManager extends Manager<EraStakingPair> {
    private async createOne(ctx: EventHandlerContext, data: EraStakingPairData) {
        const validator =
            typeof data.validator === 'string' ? await eraValidatorManager.get(ctx, data.validator) : data.validator
        const nominator =
            typeof data.nominator === 'string' ? await eraNominatorManager.get(ctx, data.nominator) : data.nominator

        const era = typeof data.era === 'number' ? await eraManager.get(ctx, data.era) : data.era

        const id = `${era?.index}-${validator?.stash.id}-${nominator?.stash.id}`

        return new EraStakingPair({
            id,
            validator,
            nominator,
            era,
            vote: data.vote,
        })
    }

    async create(ctx: EventHandlerContext, data: EraStakingPairData): Promise<EraStakingPair>
    async create(ctx: EventHandlerContext, data: EraStakingPairData[]): Promise<EraStakingPair[]>
    async create(
        ctx: EventHandlerContext,
        data: EraStakingPairData | EraStakingPairData[]
    ): Promise<EraStakingPair | EraStakingPair[]> {
        if (Array.isArray(data)) {
            const validators: EraStakingPair[] = new Array(data.length)

            for (let i = 0; i < data.length; i++) {
                validators[i] = await this.createOne(ctx, data[i])
            }

            await ctx.store.insert(EraStakingPair, validators)

            return validators
        } else {
            const validator = await this.createOne(ctx, data)

            await ctx.store.insert(EraStakingPair, validator)

            return validator
        }
    }
}

export const eraStakingPairManager = new EraStakingPairManager(EraStakingPair)
