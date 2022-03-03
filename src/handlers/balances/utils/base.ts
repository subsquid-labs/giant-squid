import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { populateMeta, encodeID, getAccount, getOrCreate, isExtrinsicSuccess } from '../../../common/helpers'
import { TransferData } from '../../../types/custom/balanceData'
import config from '../../../config'
import { Transfer } from '../../../model'

export enum Direction {
    FROM,
    TO,
}

async function populateTransferItem(
    transfer: Transfer,
    options: {
        ctx: EventHandlerContext
        data: TransferData
        dir: Direction
        success: boolean
    }
) {
    const { ctx, data, dir, success } = options

    populateMeta(ctx, transfer)

    transfer.chainName ??= config.chainName
    transfer.name ??= ctx.extrinsic?.name
    transfer.success ??= success

    transfer.amount ??= data.amount

    const idFrom = data.from ? encodeID(data.from, config.prefix) : ctx.extrinsic?.signer
    const idTo = encodeID(data.to, config.prefix)

    if (dir === Direction.FROM) {
        transfer.from = idFrom ? await getAccount(ctx.store, idFrom) : null
        transfer.account = idTo ? await getAccount(ctx.store, idTo) : null
    } else {
        transfer.to = idTo ? await getAccount(ctx.store, idTo) : null
        transfer.account = idFrom ? await getAccount(ctx.store, idFrom) : null
    }
}

export async function saveTransferEvent(ctx: EventHandlerContext, data: TransferData, success = true) {
    const id = ctx.event.id

    const transferTo = await getOrCreate(ctx.store, Transfer, `${id}-to`)
    await populateTransferItem(transferTo, { ctx, data, dir: Direction.TO, success: success })
    await ctx.store.save(transferTo)

    const transferFrom = await getOrCreate(ctx.store, Transfer, `${id}-from`)
    await populateTransferItem(transferFrom, { ctx, data, dir: Direction.FROM, success: success })
    await ctx.store.save(transferFrom)
}

export async function saveTransferCall(ctx: ExtrinsicHandlerContext, data: TransferData) {
    if (isExtrinsicSuccess(ctx)) return

    await saveTransferEvent(ctx, data, false)
}
