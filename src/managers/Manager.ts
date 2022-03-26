import { EventHandlerContext } from '@subsquid/substrate-processor'

export abstract class Manager<T> {
    abstract get(ctx: EventHandlerContext, id: string | number, data?: Partial<T>): Promise<T | undefined>
}
