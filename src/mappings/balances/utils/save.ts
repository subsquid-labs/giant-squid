import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import assert from 'assert'
import { getMeta, isExtrinsicSuccess } from '../../../common/helpers'
import { nativeTokens } from '../../../common/tokens'
import { accountManager } from '../../../managers'
import {
    AccountTransfer,
    Transfer,
    TransferAssetToken,
    TransferDirection,
    TransferLocationAccount,
    TransferType,
} from '../../../model'
import { TransferData } from './types'

export enum Direction {
    FROM,
    TO,
}

const ACA = nativeTokens.get('ACA')

export async function saveTransfer(ctx: ExtrinsicHandlerContext, data: TransferData) {
    assert(ACA)

    const id = ctx.event.id

    const from = data.from ? await accountManager.get(ctx, data.from) : null
    const to = data.to ? await accountManager.get(ctx, data.to) : null

    const transfer = new Transfer({
        id,
        ...getMeta(ctx),
        from: from
            ? new TransferLocationAccount({
                  id: from.id,
              })
            : null,
        to: to
            ? new TransferLocationAccount({
                  id: to.id,
              })
            : null,
        asset: new TransferAssetToken({
            symbol: ACA.symbol,
            decimals: ACA.decimals,
            amount: data.amount,
        }),
        success: isExtrinsicSuccess(ctx),
        type: TransferType.Native,
    })

    await ctx.store.insert(Transfer, transfer)

    if (from) {
        await ctx.store.insert(
            AccountTransfer,
            new AccountTransfer({
                id: `${transfer.id}-from`,
                transfer,
                account: from,
                direction: TransferDirection.FROM,
            })
        )
    }

    if (to) {
        await ctx.store.insert(
            AccountTransfer,
            new AccountTransfer({
                id: `${transfer.id}-to`,
                transfer,
                account: to,
                direction: TransferDirection.TO,
            })
        )
    }
}
