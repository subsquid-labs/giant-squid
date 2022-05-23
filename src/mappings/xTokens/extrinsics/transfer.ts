import { ExtrinsicHandlerContext, toHex } from '@subsquid/substrate-processor'
import { assert } from 'console'
import { UnknownVersionError } from '../../../common/errors'
import { getMeta } from '../../../common/helpers'
import { accountManager } from '../../../managers'
import { XcmAsset, XcmDestinationAccount, XcmTransfer } from '../../../model'
import storage from '../../../storage'
import { XTokensTransferCall } from '../../../types/generated/calls'
import * as v2000 from '../../../types/generated/v2000'
import * as v2011 from '../../../types/generated/v2011'
import * as v2022 from '../../../types/generated/v2022'
import * as v2042 from '../../../types/generated/v2042'

type EventData =
    | { currencyId: v2000.CurrencyId; amount: bigint; dest: v2000.VersionedMultiLocation; destWeight: bigint }
    | { currencyId: v2011.CurrencyId; amount: bigint; dest: v2011.VersionedMultiLocation; destWeight: bigint }
    | { currencyId: v2022.CurrencyId; amount: bigint; dest: v2022.VersionedMultiLocation; destWeight: bigint }
    | { currencyId: v2042.CurrencyId; amount: bigint; dest: v2042.VersionedMultiLocation; destWeight: bigint }

// type Interior = (DestData & { __kind: 'V1' })['value']['interior'] | (DestData & { __kind: 'V0' })['value']

function getCallData(ctx: ExtrinsicHandlerContext): EventData {
    return ctx._chain.decodeCall(ctx.extrinsic)
}

export async function handleTransfer(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    const asset = await getAsset(ctx, data.currencyId, data.amount)
    const to = await getDest(ctx, data.dest)

    const id = ctx.event.id

    ctx.store.insert(
        XcmTransfer,
        new XcmTransfer({
            id,
            ...getMeta(ctx),
            from: await accountManager.get(ctx, ctx.extrinsic.signer),
            to,
            assets: [asset],
            success: isExtrinsicSuccess(ctx),
        })
    )
}
