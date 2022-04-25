import { EventHandlerContext } from '@subsquid/substrate-processor'

export abstract class Manager<T> {
    abstract get(ctx: EventHandlerContext, id: string | number, data?: Partial<T>): Promise<T | undefined>

    async upsert(ctx: EventHandlerContext, item: T): Promise<T>
    async upsert(ctx: EventHandlerContext, items: T[]): Promise<T[]>
    async upsert(ctx: EventHandlerContext, item: T | T[]) {
        return await ctx.store.save(item)
    }
}
