import { getOriginAccountId } from '../../../common/tools'
import {
    AccountTransfer,
    Transfer,
    TransferAssetMultiToken,
    TransferDirection,
    TransferLocationAccount,
    TransferType,
} from '../../../model'
import * as v2032 from '../../../types/generated/v2032'
import * as v2042 from '../../../types/generated/v2042'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { getOrCreateAccount } from '../../util/entities'
import { getAsset, getDest } from './utils'

type CallData =
    | {
          currencies: [v2032.CurrencyId, bigint][]
          feeItem: number
          dest: v2032.VersionedMultiLocation
          destWeight: bigint
      }
    | {
          currencies: [v2042.CurrencyId, bigint][]
          feeItem: number
          dest: v2042.VersionedMultiLocation
          destWeight: bigint
      }

function getCallData(ctx: CallContext): CallData {
    return ctx._chain.decodeCall(ctx.call)
}

export async function handleTransferMulticurrencies(ctx: CallHandlerContext) {
    const data = getCallData(ctx)

    const accountId = getOriginAccountId(ctx.call.origin)
    if (!accountId) return

    const from = await getOrCreateAccount(ctx, accountId)

    const assets = await Promise.all(data.currencies.map((c) => getAsset(ctx, c[0], c[1])))
    const to = await getDest(ctx, data.dest)

    const id = ctx.call.id

    const transfer = new Transfer({
        id,
        blockNumber: ctx.block.height,
        timestamp: new Date(ctx.block.timestamp),
        extrinsicHash: ctx.extrinsic.hash,
        from: new TransferLocationAccount({
            id: accountId,
        }),
        to,
        asset: new TransferAssetMultiToken({
            tokens: assets,
        }),
        success: ctx.call.success,
        type: TransferType.Xcm,
    })

    await ctx.store.insert(transfer)

    await ctx.store.insert(
        new AccountTransfer({
            id: `${id}-from`,
            transfer,
            account: from,
            direction: TransferDirection.FROM,
        })
    )
}
