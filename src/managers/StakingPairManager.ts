import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Manager } from './Manager'
import { StakingPair } from '../model'
import { InsertFailedError } from '../common/errors'
import { stakingInfoManager } from './StakingInfoManager'

interface StakingPairData {
    nominator: string
    validator: string
}

export class StakingPairManager extends Manager<StakingPair> {
    async deleteByValidator(ctx: EventHandlerContext, id: string): Promise<void> {
        await ctx.store
            .createQueryBuilder(StakingPair, 'stakingPair')
            .where('stakingPair.validator_id = :id', { id })
            .cache(true)
            .delete()
    }

    async deleteByNominator(ctx: EventHandlerContext, id: string): Promise<void> {
        await ctx.store
            .createQueryBuilder(StakingPair, 'stakingPair')
            .where('stakingPair.nominator_id = :id', { id })
            .cache(true)
            .delete()
    }

    async create(ctx: EventHandlerContext, data: StakingPairData): Promise<StakingPair> {
        const id = `${data.validator}-${data.nominator}`

        const validator = await stakingInfoManager.get(ctx, data.validator)
        const nominator = await stakingInfoManager.get(ctx, data.nominator)

        const stakingPair = new StakingPair({
            id,
            validator,
            nominator,
        })

        if (!(await ctx.store.insert(StakingPair, stakingPair))) throw new InsertFailedError(StakingPair.name, id)

        return stakingPair
    }
}

export const stakingPairManager = new StakingPairManager(StakingPair)
