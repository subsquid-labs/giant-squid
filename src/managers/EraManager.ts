import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Era } from '../model'
import { Manager } from './Manager'

interface EraData {
    index: number
    timestamp?: number
    startedAt?: number
    total: bigint
    validatorsCount: number
    nominatorsCount: number
}

class EraManager extends Manager<Era> {
    async getByIndex(ctx: EventHandlerContext, index: number): Promise<Era | undefined> {
        return await ctx.store.findOne(Era, { index }, { cache: true })
    }

    async create(ctx: EventHandlerContext, data: EraData): Promise<Era> {
        const id = data.index.toString()

        const era = new Era({
            id,
            index: data.index,
            timestamp: new Date(data.timestamp || ctx.block.timestamp),
            startedAt: data.startedAt || ctx.block.height,
            total: 0n,
            validatorsCount: data.validatorsCount,
            nominatorsCount: data.nominatorsCount,
        })

        await ctx.store.insert(Era, era)

        return era
    }
}

export const eraManager = new EraManager(Era)
