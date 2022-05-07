import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Manager } from './Manager'
import { ItemBase } from '../common/helpers'

export abstract class ItemManager<T extends ItemBase> extends Manager<T> {
    protected getMeta(ctx: EventHandlerContext) {
        return {
            extrinsicHash: ctx.extrinsic?.hash,
            name: ctx.extrinsic?.name,
            blockNumber: BigInt(ctx.block.height).valueOf(),
            timestamp: new Date(ctx.block.timestamp),
        }
    }

    async getByExtrinsic(ctx: EventHandlerContext, extrinsic: string): Promise<T[]> {
        return await ctx.store.find(this.entityConstructor, {
            where: {
                extrinsicHash: extrinsic,
            },
        })
    }
}
