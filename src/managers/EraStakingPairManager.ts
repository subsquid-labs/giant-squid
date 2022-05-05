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
    async create(ctx: EventHandlerContext, data: EraStakingPairData): Promise<EraStakingPair> {
        const validator =
            typeof data.validator === 'string' ? await eraValidatorManager.get(ctx, data.validator) : data.validator
        const nominator =
            typeof data.nominator === 'string' ? await eraNominatorManager.get(ctx, data.nominator) : data.nominator

        const era = typeof data.era === 'number' ? await eraManager.get(ctx, data.era) : data.era

        const id = `${era?.index}-${validator?.stash.id}-${nominator?.stash.id}`

        const stakingPair = new EraStakingPair({
            id,
            validator,
            nominator,
            era,
            vote: data.vote,
        })

        await ctx.store.insert(EraStakingPair, stakingPair)

        return stakingPair
    }
}

export const eraStakingPairManager = new EraStakingPairManager(EraStakingPair)
