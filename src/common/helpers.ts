import * as ss58 from '@subsquid/ss58'
import { getAddress } from '@ethersproject/address'
import { EventHandlerContext, ExtrinsicHandlerContext, toHex } from '@subsquid/substrate-processor'
import config from '../config'
import { StorageContext } from '../types/generated/support'
import { EXTRINSIC_SUCCESS } from './consts'

export function encodeId(id: Uint8Array) {
    return ss58.codec(config.prefix).encode(id)
}

export function decodeId(id: string) {
    return ss58.codec(config.prefix).decode(id)
}

export interface ItemBase {
    id: string
    timestamp: Date | null | undefined
    blockNumber: bigint | null | undefined
    extrinsicHash: string | null | undefined
}

export function isExtrinsicSuccess(ctx: ExtrinsicHandlerContext) {
    return ctx.event.name === EXTRINSIC_SUCCESS
}

export function createPrevStorageContext(ctx: StorageContext & { block: { parentHash: string; height: number } }) {
    return {
        _chain: ctx._chain,
        block: {
            ...ctx.block,
            hash: ctx.block.parentHash,
            height: ctx.block.height,
        },
    }
}

export function saturatingSumBigInt(
    a: bigint,
    b: bigint,
    { max, min }: { max: null | bigint; min: bigint } = { max: null, min: 0n }
): bigint {
    const sum = BigInt(a) + BigInt(b)
    if (sum < min) {
        return min
    } else if (max && sum > max) {
        return max
    } else {
        return sum
    }
}

export function getMeta(ctx: EventHandlerContext) {
    return {
        extrinsicHash: ctx.extrinsic?.hash,
        blockNumber: ctx.block.height,
        timestamp: new Date(ctx.block.timestamp),
    }
}

export function isAdressSS58(address: Uint8Array) {
    switch (address.length) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 32:
        case 33:
            return true
        default:
            return false
    }
}

export function encodeEvm(id: Uint8Array): string {
    return getAddress(toHex(id))
}
