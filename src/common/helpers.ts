import * as ss58 from "@subsquid/ss58"
import { EventHandlerContext, ExtrinsicHandlerContext, Store, SubstrateExtrinsic } from "@subsquid/substrate-processor";
import { boolean } from "../model/generated/marshal";

export function encodeID(ID: Uint8Array, chainName: string) {
    return ss58.codec(chainName).encode(ID);
}

export async function getOrCreate<T extends { id: string }>(
    store: Store,
    entityConstructor: EntityConstructor<T>,
    id: string,
): Promise<T> {

    let e = await store.get<T>(entityConstructor, {
        where: { id },
    })

    if (e == null) {
        e = new entityConstructor()
        e.id = id
    }

    return e
}

export async function createEvent<T extends EventBase>(
    entityConstructor: EntityConstructor<T>,
    ctx: EventHandlerContext,
    id: string,
    data: Omit<T, keyof EventBase>
) {
    let event = await getOrCreate(ctx.store, entityConstructor, id)

    event = Object.assign(event, {
        blockHash: ctx.block.hash,
        blockNumber: ctx.event.blockNumber,
        extrinisicHash: ctx.extrinsic?.hash,
        date: new Date(ctx.block.timestamp),
        event: ctx.event.name,
        ...data
    })

    return event
}

export interface EventBase {
    id: string
    date: Date
    blockHash: string
    blockNumber: bigint
    extrinisicHash?: string | null
    event: string
}

export type EntityConstructor<T> = {
    new(...args: any[]): T
}

export function isExtrinsicSuccess(ctx: ExtrinsicHandlerContext) {
    return ctx.event.method == 'ExtrinsicSuccess'
}