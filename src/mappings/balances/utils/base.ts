import { EventHandlerContext, ExtrinsicHandlerContext, toHex } from '@subsquid/substrate-processor'
import { isExtrinsicSuccess } from '../../../common/helpers'
import { TransferData } from '../../../types/custom/balanceData'
import config from '../../../config'
import { TransferDirection } from '../../../model'
import { accountManager } from '../../../managers'
import { accountTransferManager } from '../../../managers/AccountTransferManager'
import { transferManager } from '../../../managers/TransferManager'
import { AddressNotDecoded } from '../../../common/errors'
import { getAddress } from '@ethersproject/address'

export async function saveTransferEvent(ctx: EventHandlerContext, data: TransferData, success = true): Promise<void> {
    const idFrom = data.from ? getAddress(toHex(data.from)) : ctx.extrinsic?.signer
    const idTo = getAddress(toHex(data.to))

    if (!idFrom || !idTo) throw new AddressNotDecoded([data.from, data.to])

    const id = ctx.event.id

    const transfer = await transferManager.create(ctx, {
        id,
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
