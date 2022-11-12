import * as ss58 from '@subsquid/ss58'
import { getAddress } from '@ethersproject/address'
import { EventHandlerContext, CallHandlerContext, toHex } from '@subsquid/substrate-processor'
import config from '../config'
import { EXTRINSIC_SUCCESS } from './consts'
import { Store } from '@subsquid/typeorm-store'

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

export function isExtrinsicSuccess(ctx: EventHandlerContext<Store>) {
    return ctx.event.name === EXTRINSIC_SUCCESS
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

export function getMeta(ctx: EventHandlerContext<Store, { event: { extrinsic: { hash: true } } }>) {
    return {
        extrinsicHash: ctx.event.extrinsic?.hash,
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

