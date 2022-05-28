import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Round } from '../model'
import { Manager } from './Manager'
export interface RoundData {
    startingBlock: number
    round: number
    selectedCollatorsNumber: number
    totalBalance: bigint
}

class RoundManager extends Manager<Round> {
    private lastRound?: Round

    async getRoundIndexForRewards(ctx: EventHandlerContext): Promise<number | undefined> {
        if (!this.lastRound) {
            this.lastRound = await ctx.store.findOne(Round, { order: { index: 'DESC' } })
        }
        return Math.min((this.lastRound?.index || 0) - 4, 0)
    }

    async create(ctx: EventHandlerContext, data: RoundData): Promise<void> {
        this.lastRound = new Round({
            id: ctx.event.id,
            index: data.round,
            timestamp: new Date(ctx.block.timestamp),
            startedAt: ctx.block.height,
            collatorsCount: data.selectedCollatorsNumber,
            total: data.totalBalance,
        })

        await ctx.store.insert(Round, this.lastRound)
    }
}

export const roundManager = new RoundManager(Round)
