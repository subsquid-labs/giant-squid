import { EventHandlerContext } from '@subsquid/substrate-processor'

type EntityConstructor<T> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T
}

export abstract class Manager<T> {
    constructor(protected entityConstructor: EntityConstructor<T>) {}

    get(ctx: EventHandlerContext, id: string | number): Promise<T | undefined> {
        return ctx.store.findOne(this.entityConstructor, id)
    }

    async update(ctx: EventHandlerContext, item: T): Promise<T>
    async update(ctx: EventHandlerContext, items: T[]): Promise<T[]>
    async update(ctx: EventHandlerContext, item: T | T[]) {
        return await ctx.store.save(item, {})
    }
}
