import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CommonHandlerContext } from './types'

type EntityConstructor<T> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T
}

export abstract class Manager<T extends object> {
    constructor(protected entityConstructor: EntityConstructor<T>) {}

    async get(ctx: CommonHandlerContext, id: string): Promise<T | undefined>
    async get(ctx: CommonHandlerContext, ids: string[]): Promise<T[]>
    async get(ctx: CommonHandlerContext, ids: string | string[]) {
        if (Array.isArray(ids)) {
            return ctx.store.findByIds(this.entityConstructor, ids)
        } else {
            return ctx.store.findOne(this.entityConstructor, ids)
        }
    }

    async update(ctx: CommonHandlerContext, item: T): Promise<T>
    async update(ctx: CommonHandlerContext, items: T[]): Promise<T[]>
    async update(ctx: CommonHandlerContext, item: T | T[]) {
        await ctx.store.save(item)
        return item
    }
}
