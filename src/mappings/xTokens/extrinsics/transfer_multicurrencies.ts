import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { getMeta, isExtrinsicSuccess } from '../../../common/helpers'
import { accountManager } from '../../../managers'
import { XcmTransfer } from '../../../model'
import * as v2032 from '../../../types/generated/v2032'
import * as v2042 from '../../../types/generated/v2042'
import { getAsset, getDest } from '../utils/parsers'

type EventData =
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

function getCallData(ctx: ExtrinsicHandlerContext): EventData {
    return ctx._chain.decodeCall(ctx.extrinsic)
}

export async function handleTransferMulticurrencies(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    const assets = await Promise.all(data.currencies.map((c) => getAsset(ctx, c[0], c[1])))
    const to = await getDest(ctx, data.dest)

    const id = ctx.event.id

    ctx.store.insert(
        XcmTransfer,
        new XcmTransfer({
            id,
            ...getMeta(ctx),
            from: await accountManager.get(ctx, ctx.extrinsic.signer),
            to,
            assets,
            success: isExtrinsicSuccess(ctx),
        })
    )
}
