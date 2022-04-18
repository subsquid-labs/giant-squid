import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Transfer } from '../model'
import { Manager } from './Manager'
import { EntityMetadataFields } from '../types/custom/EntityMetaData'
import { populateMeta } from '../common/helpers'

export class TransferManager extends Manager<Transfer> {
    async create(ctx: EventHandlerContext, data: Omit<Transfer, EntityMetadataFields>): Promise<Transfer> {
        const transfer = new Transfer(data)
        populateMeta(ctx, transfer)

        await ctx.store.insert(Transfer, transfer)

        return transfer
    }

    get(ctx: EventHandlerContext, id: string): Promise<Transfer | undefined> {
        return ctx.store.findOne(id)
    }
}

export const transferManager = new TransferManager()
