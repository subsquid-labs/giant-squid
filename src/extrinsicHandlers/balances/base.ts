import { EventHandlerContext, ExtrinsicHandlerContext } from "@subsquid/substrate-processor";
import { encodeID, getOrCreate, isExtrinsicSuccess } from "../../common/helpers";
import { TransferData } from "../../common/mapping/balanceData";
import config from "../../config";
import { Transfer } from "../../model";

export async function handleTransferBase(ctx: ExtrinsicHandlerContext, data: TransferData) {
    const id = `${ctx.extrinsic.id}`

    const transfer = await getOrCreate(ctx.store, Transfer, id)

    transfer.name = transfer.name || ctx.extrinsic.name
    transfer.extrinisicHash = transfer.extrinisicHash || ctx.extrinsic.hash
    transfer.blockNumber = transfer.blockNumber || BigInt(ctx.block.height)
    transfer.success = transfer.success || isExtrinsicSuccess(ctx)
    transfer.date = transfer.date || new Date(ctx.event.blockTimestamp)

    if (!transfer.success) {
        transfer.from = data.from ? encodeID(data.from, config.chainName) : ctx.extrinsic.signer
        transfer.to = encodeID(data.to, config.chainName)
        transfer.amount = data.amount || 0n
    }

    ctx.store.save(transfer)
}