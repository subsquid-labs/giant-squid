import { getOriginAccountId } from '../../../common/tools'
import {
    AccountTransfer,
    Transfer,
    TransferAssetToken,
    TransferDirection,
    TransferLocationAccount,
    TransferType,
} from '../../../model'
import * as v2000 from '../../../types/generated/v2000'
import * as v2011 from '../../../types/generated/v2011'
import * as v2022 from '../../../types/generated/v2022'
import * as v2042 from '../../../types/generated/v2042'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { getOrCreateAccount } from '../../util/entities'
import { getAsset, getDest } from './utils'

type CallData =
    | { currencyId: v2000.CurrencyId; amount: bigint; dest: v2000.VersionedMultiLocation; destWeight: bigint }
    | { currencyId: v2011.CurrencyId; amount: bigint; dest: v2011.VersionedMultiLocation; destWeight: bigint }
    | { currencyId: v2022.CurrencyId; amount: bigint; dest: v2022.VersionedMultiLocation; destWeight: bigint }
    | { currencyId: v2042.CurrencyId; amount: bigint; dest: v2042.VersionedMultiLocation; destWeight: bigint }

// type Interior = (DestData & { __kind: 'V1' })['value']['interior'] | (DestData & { __kind: 'V0' })['value']

function getCallData(ctx: CallContext): CallData {
    return ctx._chain.decodeCall(ctx.call)
}

export async function handleTransfer(ctx: CallHandlerContext) {
    const data = getCallData(ctx)

    const accountId = getOriginAccountId(ctx.call.origin)
    if (!accountId) return

    const from = await getOrCreateAccount(ctx, accountId)

    const asset = await getAsset(ctx, data.currencyId, data.amount)
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
        asset: new TransferAssetToken({
            symbol: asset.symbol,
            amount: data.amount,
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
