import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
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
export function saturatingSumBigInt(a: bigint, b: bigint, { max, min } = { max: null, min: 0n }): bigint {
    const sum = BigInt(a) + BigInt(b)
    return sum < min ? min : max && sum > max ? max : sum
}
