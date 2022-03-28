import * as ss58 from '@subsquid/ss58'
import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { EXTRINSIC_SUCCESS } from './consts'

export function encodeID(ID: Uint8Array, prefix: string | number) {
    let ret: string | null
    try {
        ret = ss58.codec(prefix).encode(ID)
    } catch (e) {
        ret = null
    }

    return ret
}

export function populateMeta<T extends ItemBase>(ctx: ExtrinsicHandlerContext | EventHandlerContext, entity: T): void {
    entity.extrinsicHash = ctx.extrinsic?.hash
    entity.blockNumber = BigInt(ctx.block.height).valueOf()
    entity.date = new Date(ctx.block.timestamp)
}

export interface ItemBase {
    id: string
    date: Date | null | undefined
    blockNumber: bigint | null | undefined
    extrinsicHash: string | null | undefined
}

export function isExtrinsicSuccess(ctx: ExtrinsicHandlerContext) {
    return ctx.event.name === EXTRINSIC_SUCCESS
}
