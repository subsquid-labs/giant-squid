import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { encodeID, isExtrinsicSuccess } from '../../../common/helpers'
import { TransferData } from '../../../types/custom/balanceData'
import config from '../../../config'
import { TransferDirection } from '../../../model'
import { accountManager, chainManager } from '../../../managers'
import { accountTransferManager } from '../../../managers/AccountTransferManager'
import { transferManager } from '../../../managers/TransferManager'
import { AddressNotDecoded } from '../../../common/errors'

export async function saveTransferEvent(ctx: EventHandlerContext, data: TransferData, success = true): Promise<void> {
    const idFrom = data.from ? encodeID(data.from, config.prefix) : ctx.extrinsic?.signer
    const idTo = encodeID(data.to, config.prefix)

    if (!idFrom || !idTo) throw new AddressNotDecoded([data.from, data.to])

    const id = ctx.event.id

    const transfer = await transferManager.create(ctx, {
        id,
        chain: await chainManager.get(ctx, config.chainName),
        name: ctx.extrinsic?.name,
        success,
        from: await accountManager.get(ctx, idFrom),
        to: await accountManager.get(ctx, idTo),
        amount: data.amount,
    })

    await accountTransferManager.create(ctx, {
        id: `${id}-from`,
        transfer,
        account: transfer.from,
        direction: TransferDirection.FROM,
    })
    await accountTransferManager.create(ctx, {
        id: `${id}-to`,
        transfer,
        account: transfer.to,
        direction: TransferDirection.TO,
    })
}

export async function saveTransferCall(ctx: ExtrinsicHandlerContext, data: TransferData): Promise<void> {
    if (isExtrinsicSuccess(ctx)) return

    await saveTransferEvent(ctx, data, false)
}
