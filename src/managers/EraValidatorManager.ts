import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Manager } from './Manager'
import { Account, Era, EraValidator, StakingInfo } from '../model'
import { accountManager } from './AccountManager'
import { eraManager } from './EraManager'

export interface EraValidatorData {
    stash: string | Account
    era: number | Era
    totalBonded: bigint
    selfBonded?: bigint
}

class EraValidatorManager extends Manager<EraValidator> {
    async get(ctx: EventHandlerContext, id: string): Promise<EraValidator | undefined> {
        return await ctx.store.findOne(EraValidator, id, { cache: true })
    }

    private async createOne(ctx: EventHandlerContext, data: EraValidatorData) {
        const stash = typeof data.stash === 'string' ? await accountManager.get(ctx, data.stash) : data.stash
        const era = typeof data.era === 'number' ? await eraManager.getByIndex(ctx, data.era) : data.era

        const id = `${era?.index}-${stash.id}`

        return new EraValidator({
            id,
            stash,
            era,
            selfBonded: data.selfBonded || stash.activeBond,
            totalBonded: data.totalBonded,
        })
    }

    async create(ctx: EventHandlerContext, data: EraValidatorData): Promise<EraValidator>
    async create(ctx: EventHandlerContext, data: EraValidatorData[]): Promise<EraValidator[]>
    async create(ctx: EventHandlerContext, data: EraValidatorData | EraValidatorData[]) {
        if (Array.isArray(data)) {
            const validators: EraValidator[] = []

            for (const validatorData of data) {
                validators.push(await this.createOne(ctx, validatorData))
            }

            await ctx.store.insert(EraValidator, validators)

            return validators
        } else {
            const validator = await this.createOne(ctx, data)

            await ctx.store.insert(StakingInfo, validator)

            return validator
        }
    }
}

export const eraValidatorManager = new EraValidatorManager(EraValidator)
