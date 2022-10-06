import * as ss58 from '@subsquid/ss58'
import config from '../configs/kusama'
import { decodeHex } from '@subsquid/util-internal-hex'
import { BatchContext, CommonHandlerContext, SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import assert from 'assert'

const ss58codec = ss58.codec(config.prefix)

export function encodeId(id: string | Uint8Array): string {
    id = typeof id === 'string' ? decodeHex(id) : id
    if (isAdressSS58(id)) {
        return ss58codec.encode(id)
    } else {
        return toHex(id)
    }
}

export function decodeId(id: string): Uint8Array {
    return ss58codec.decode(id)
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

export function getOriginAccountId(origin: any): string | undefined {
    if (origin && origin.__kind === 'system' && origin.value.__kind === 'Signed') {
        const id = origin.value.value
        if (id.__kind === 'Id') {
            return encodeId(id.value)
        } else {
            return encodeId(id)
        }
    } else {
        return undefined
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

export function isStorageCorrupted(ctx: CommonHandlerContext<unknown>) {
    return ctx.block.height >= 1375087 && ctx.block.height <= 1600000
}

export function processItem<I>(ctx: BatchContext<any, I>, fn: (block: SubstrateBlock, item: I) => void) {
    for (let block of ctx.blocks) {
        for (let item of block.items) {
            fn(block.header, item)
        }
    }
}

export function last<T>(array: T[]): T {
    assert(array.length > 0)
    return array[array.length - 1]
}

export function createEntityMap<T extends { id: string }>(entities: T[]) {
    return new Map(entities.map((e) => [e.id, e]))
}
