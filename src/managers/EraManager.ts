import { Store } from '@subsquid/typeorm-store'
import { Era } from '../model'
import { Manager } from './Manager'
import { CommonHandlerContext } from './types'

interface EraData {
    index: number
    timestamp: number
    startedAt: number
    total: bigint
    validatorsCount: number
    nominatorsCount: number
}

class EraManager extends Manager<Era> {
    async getByIndex(ctx: CommonHandlerContext, index: number): Promise<Era | undefined> {
        return await ctx.store.findOne(Era, { index })
    }

    async create(ctx: CommonHandlerContext, data: EraData): Promise<Era> {
        const id = data.index.toString()

        const era = new Era({
            id,
            index: data.index,
            timestamp: new Date(data.timestamp),
            startedAt: data.startedAt,
            total: data.total,
            validatorsCount: data.validatorsCount,
            nominatorsCount: data.nominatorsCount,
        })

        await ctx.store.insert(era)

        return era
    }
}

export const eraManager = new EraManager(Era)
