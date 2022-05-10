import * as ss58 from '@subsquid/ss58'
import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { EXTRINSIC_SUCCESS } from './consts'
import { AssertionError } from 'assert'

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
