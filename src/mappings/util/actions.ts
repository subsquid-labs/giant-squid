import { CommonHandlerContext, EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import assert from 'assert'
import { BondType, DAppContract } from '../../model'
import { ActionData } from '../types/data'
import { getOrCreateStaker, getOrCreateStakeState } from './entities'
import { saveBond } from '../dAppsStaking/utils/savers'

export function getMeta(data: ActionData) {
    const { id, extrinsicHash, timestamp, blockNumber } = data
    return {
        id,
        extrinsicHash,
        timestamp,
        blockNumber,
    }
}

export function createPrevStorageContext(ctx: CommonHandlerContext<Store>) {
    return {
        _chain: ctx._chain,
        block: {
            ...ctx.block,
            hash: ctx.block.parentHash,
            height: ctx.block.height,
        },
    }
}
