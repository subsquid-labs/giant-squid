import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Manager } from './Manager'
import { Account, Era, EraNominator, StakingInfo } from '../model'
import { accountManager } from './AccountManager'
import { eraManager } from './EraManager'

export interface EraNominatorData {
    stash: string | Account
    era: number | Era
    bonded?: bigint
}

class EraNominatorManager extends Manager<EraNominator> {
    private async createOne(ctx: EventHandlerContext, data: EraNominatorData) {
        const stash = typeof data.stash === 'string' ? await accountManager.get(ctx, data.stash) : data.stash
        const era = typeof data.era === 'number' ? await eraManager.getByIndex(ctx, data.era) : data.era

        const id = `${era?.index}-${stash.id}`

        return new EraNominator({
            id,
            stash,
            era,
            bonded: data.bonded || stash.activeBond,
        })
    }

    async create(ctx: EventHandlerContext, data: EraNominatorData): Promise<EraNominator>
    async create(ctx: EventHandlerContext, data: EraNominatorData[]): Promise<EraNominator[]>
    async create(ctx: EventHandlerContext, data: EraNominatorData | EraNominatorData[]) {
        if (Array.isArray(data)) {
            const validators: EraNominator[] = []

            for (const validatorData of data) {
                validators.push(await this.createOne(ctx, validatorData))
            }

            await ctx.store.insert(EraNominator, validators)

            return validators
        } else {
            const validator = await this.createOne(ctx, data)

            await ctx.store.insert(StakingInfo, validator)

            return validator
        }
    }
}

export const eraNominatorManager = new EraNominatorManager(EraNominator)
