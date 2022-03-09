import * as ss58 from '@subsquid/ss58'
import { EventHandlerContext, ExtrinsicHandlerContext, Store } from '@subsquid/substrate-processor'
import { Account } from '../model'
import { EXTRINSIC_SUCCESS } from './consts'
import { findById } from './dbUtils'

export function encodeID(ID: Uint8Array, prefix: string | number) {
    let ret: string | null
    try {
        ret = ss58.codec(prefix).encode(ID)
    } catch (e) {
        ret = null
    }

    return ret
}

export async function getAccount(store: Store, id: string) {
    let account = await findById(store, Account, id)

    if (!account) {
        account = new Account({
            id: id,
            totalReward: 0n,
            totalStake: 0n,
            totalSlash: 0n,
        })

        await store.save(account)
    }

    return account
}

export function populateMeta<T extends ItemBase>(ctx: ExtrinsicHandlerContext | EventHandlerContext, entity: T): void {
    entity.extrinsicHash = ctx.extrinsic?.hash
    entity.blockNumber = BigInt(ctx.block.height)
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
