import * as ss58 from '@subsquid/ss58'
import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { EXTRINSIC_SUCCESS } from './consts'
import { AssertionError } from 'assert'

export function encodeID(ID: Uint8Array, prefix: string | number): string | null {
    let ret: string | null
    try {
        ret = ss58.codec(prefix).encode(ID)
    } catch (e) {
        if (e instanceof AssertionError) {
            ret = '0x' + (ID as Buffer).toString('hex')
        } else {
            console.error(e)
            ret = null
        }
    }

    return ret
}

export function decodeID(ID: string, prefix: string | number): Uint8Array | null {
    let ret: Uint8Array | null
    try {
        ret = ss58.codec(prefix).decode(ID)
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

export function isExtrinsicSuccess(ctx: ExtrinsicHandlerContext): boolean {
    return ctx.event.name === EXTRINSIC_SUCCESS
}
