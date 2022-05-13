import { getAddress } from '@ethersproject/address'
import { EventHandlerContext, ExtrinsicHandlerContext, toHex } from '@subsquid/substrate-processor'
import { StorageContext } from '../types/generated/support'
import { EXTRINSIC_SUCCESS } from './consts'

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

export function decodeId(id: string): Uint8Array {
    return Buffer.from(id.slice(2), 'hex')
}

export function encodeId(id: Uint8Array): string {
    return getAddress(toHex(id))
}

export function createPrevStorageContext(ctx: StorageContext & { block: { parentHash: string } }): StorageContext {
    return {
        _chain: ctx._chain,
        block: {
            ...ctx.block,
            hash: ctx.block.parentHash,
        },
    }
}
