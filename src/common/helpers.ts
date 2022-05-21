import * as ss58 from '@subsquid/ss58'
import { EventHandlerContext, ExtrinsicHandlerContext, toHex } from '@subsquid/substrate-processor'
import config from '../config'
import { EXTRINSIC_SUCCESS } from './consts'

export function encodeId(id: Uint8Array) {
    try {
        return ss58.codec(config.prefix).encode(id)
    } catch (e) {
        const hex = toHex(id)
        console.warn(`Warning: Failed to encode ${hex} with prefix ${config.prefix}`)

        return hex
    }
}

export function decodeId(id: string) {
    try {
        return ss58.codec(config.prefix).decode(id)
    } catch (e) {
        console.warn(`Warning: Failed to decode ${id} with prefix ${config.prefix}`)

        return undefined
    }
}

export function getMeta(ctx: EventHandlerContext) {
    return {
        extrinsicHash: ctx.extrinsic?.hash,
        name: ctx.extrinsic?.name,
        blockNumber: BigInt(ctx.block.height).valueOf(),
        timestamp: new Date(ctx.block.timestamp),
    }
}

export function isExtrinsicSuccess(ctx: ExtrinsicHandlerContext) {
    return ctx.event.name === EXTRINSIC_SUCCESS
}