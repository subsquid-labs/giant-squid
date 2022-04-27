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
    async deleteByValidator(ctx: EventHandlerContext, id: string, nominators?: string[]): Promise<void> {
        const query = ctx.store
            .createQueryBuilder(StakingPair, 'stakingPair')
            .delete()
            .where('stakingPair.validator_id = :id', { id })

        if (nominators) query.andWhere('stakingPair.nominator_id IN (:nominators)', { nominators })

        await query.execute()
    }

    async deleteByNominator(ctx: EventHandlerContext, id: string, validators?: string[]): Promise<void> {
        const query = ctx.store
            .createQueryBuilder(StakingPair, 'stakingPair')
            .where('stakingPair.nominator_id = :id', { id })

        if (validators) query.andWhere('stakingPair.validator_id IN (:validators)', { validators })

        await query.execute()
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
