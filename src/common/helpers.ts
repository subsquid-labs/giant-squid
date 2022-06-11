import * as ss58 from '@subsquid/ss58'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import config from '../config'
import { PayeeType } from '../model'
import { PayeeTypeRaw } from '../types/custom/stakingData'
import { StorageContext } from '../types/generated/support'
import { decodeHex } from '@subsquid/util-internal-hex'
import { Hash } from 'crypto'

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

export function getOriginAccountId(origin: any) {
    // eslint-disable-next-line sonarjs/no-small-switch
    switch (origin.__kind) {
        case 'system':
            // eslint-disable-next-line sonarjs/no-nested-switch, sonarjs/no-small-switch
            switch (origin.value.__kind) {
                case 'Signed':
                    return encodeId(decodeHex(origin.value.value))
                default:
                    throw new Error(`Unknown origin type ${origin.__kind}.${origin.value.__kind}`)
            }
        default:
            throw new Error(`Unknown origin type ${origin.__kind}`)
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
