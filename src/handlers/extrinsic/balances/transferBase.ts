import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { encodeID, getOrCreate, isExtrinsicSuccess, populateMeta } from '../../../common/helpers'
import { TransferData } from '../../../common/types/balanceData'
import config from '../../../config'
import { Transfer } from '../../../model'

export async function saveTransferCall(ctx: ExtrinsicHandlerContext, data: TransferData) {
    const id = `${ctx.extrinsic.id}`

    const transfer = await getOrCreate(ctx.store, Transfer, id)

    populateMeta(ctx, transfer)

    transfer.success ??= isExtrinsicSuccess(ctx)
    transfer.chainName ??= config.chainName
    transfer.name ??= ctx.extrinsic.name

    transfer.from ??= data.from ? encodeID(data.from, config.chainName) : ctx.extrinsic.signer
    transfer.to ??= data.to ? encodeID(data.to, config.chainName) : null
    transfer.amount ??= data.amount ?? 0n

    ctx.store.save(transfer)
}
