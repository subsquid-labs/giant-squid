import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Round } from '../model'
import { Manager } from './Manager'
import { RoundData } from '../types/custom/stakingData'

class RoundManager extends Manager<Round> {
    private static lastRound?: Round

    async get(ctx: EventHandlerContext): Promise<Round | undefined> {
        if (RoundManager.lastRound) {
            return RoundManager.lastRound
        }
        RoundManager.lastRound = await ctx.store.findOne(Round, { order: { round: 'DESC' } })
        return RoundManager.lastRound
    }

    async getRoundNumberForRewards(ctx: EventHandlerContext): Promise<number | undefined> {
        return this.get(ctx).then((round) => Math.min((round?.round || 0) - 4, 0))
    }

    async save(ctx: EventHandlerContext, data: RoundData): Promise<void> {
        RoundManager.lastRound = new Round({
            id: ctx.event.id,
            ...data,
            blockNumber: BigInt(ctx.block.height),
            date: new Date(ctx.block.timestamp),
            extrinsicHash: ctx.extrinsic?.hash,
        })

        await ctx.store.insert(Round, RoundManager.lastRound)
    }
}

export const roundManager = new RoundManager()
