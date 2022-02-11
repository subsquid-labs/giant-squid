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

export async function getOrCreate<T extends { id: string }>(
    store: Store,
    entityConstructor: EntityConstructor<T>,
    id: string
): Promise<T>
export async function getOrCreate<T extends { id: string }>(
    store: Store,
    entityConstructor: EntityConstructor<T>,
    id: Partial<T>
): Promise<T>
export async function getOrCreate<T extends { id: string }>(
    store: Store,
    entityConstructor: EntityConstructor<T>,
    idOrOptions: string | Partial<T>
): Promise<T> {
    let e

    if (typeof idOrOptions == 'string') {
        e = await store.findOne<T>(entityConstructor, idOrOptions)
    } else {
        e = await store.findOne<T>(entityConstructor, { where: idOrOptions })
    }

    if (!e) {
        if (typeof idOrOptions == 'string') {
            e = new entityConstructor({ id: idOrOptions })
        } else {
            e = new entityConstructor(idOrOptions)
        }
    }

    return e
}

export function populateMeta<T extends ItemBase>(ctx: ExtrinsicHandlerContext | EventHandlerContext, entity: T): void {
    entity.id ??= ctx.event.id
    entity.extrinsicId ??= ctx.extrinsic?.id
    entity.extrinsicHash ??= ctx.extrinsic?.hash
    entity.blockNumber ??= BigInt(ctx.block.height)
    entity.date ??= new Date(ctx.block.timestamp)
}

export interface ItemBase {
    id: string
    extrinsicId: string | null | undefined
    date: Date | null | undefined
    blockNumber: bigint | null | undefined
    extrinsicHash: string | null | undefined
}

export type EntityConstructor<T> = {
    new (...args: any[]): T
}

export function isExtrinsicSuccess(ctx: ExtrinsicHandlerContext) {
    return ctx.event.name === EXTRINSIC_SUCCESS
}
