import * as ss58 from '@subsquid/ss58'
import { EventHandlerContext, ExtrinsicHandlerContext, Store } from '@subsquid/substrate-processor'
import { EXTRINSIC_SUCCESS } from './consts'

export function encodeID(ID: Uint8Array, chainName: string) {
    let ret: string | null
    try {
        ret = ss58.codec(chainName).encode(ID)
    } catch (e) {
        ret = null
    }

    return ret
}

export async function getOrCreate<T extends { id: string }>(store: Store, entityConstructor: EntityConstructor<T>, id: string): Promise<T> {
    let e = await store.findOne<T>(entityConstructor, id)

    if (!e) {
        e = new entityConstructor()
        e.id = id
    }

    return e
}

export function populateMeta<T extends ItemBase>(ctx: EventHandlerContext, entity: T): void
export function populateMeta<T extends ItemBase>(ctx: ExtrinsicHandlerContext, entity: T): void
export function populateMeta<T extends ItemBase>(ctx: ExtrinsicHandlerContext | EventHandlerContext, entity: T): void {
    entity.extrinisicHash ??= ctx.extrinsic?.hash
    entity.blockNumber ??= BigInt(ctx.block.height)
    entity.date ??= new Date(ctx.block.timestamp)
}

export interface ItemBase {
    id: string
    date: Date | null | undefined
    blockNumber: bigint | null | undefined
    extrinisicHash: string | null | undefined
}

export type EntityConstructor<T> = {
    new (...args: any[]): T
}

export function isExtrinsicSuccess(ctx: ExtrinsicHandlerContext) {
    return ctx.event.name === EXTRINSIC_SUCCESS
}
