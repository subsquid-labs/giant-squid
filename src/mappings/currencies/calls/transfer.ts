import { CurrencyId as CurrencyIdv2042 } from '../../../types/generated/v2042'
import { CurrencyId as CurrencyIdv2011 } from '../../../types/generated/v2011'
import { CurrencyId as CurrencyIdv2080 } from '../../../types/generated/v2080'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId, getOriginAccountId, isAdressSS58 } from '../../../common/tools'
import { TransferType } from '../../../model'
import { nativeTokens } from '../../../common/tokens'
import assert from 'assert'
import storage from '../../../storage'
import { CallContext, CallHandlerContext, CommonHandlerContext } from '../../types/contexts'
import { CurrenciesTransferCall } from '../../../types/generated/calls'
import { saveTransfer } from '../../util/entities'

type CurrencyId = CurrencyIdv2042 | CurrencyIdv2011 | CurrencyIdv2080

interface EventData {
    currency: CurrencyId
    to: Uint8Array
    amount: bigint
}

function getEventData(ctx: CallContext): EventData {
    const call = new CurrenciesTransferCall(ctx)
    if (call.isV2000) {
        const { dest, currencyId, amount } = call.asV2000
        return {
            currency: currencyId,
            to: dest.value as Uint8Array,
            amount,
        }
    } else if (call.isV2011) {
        const { dest, currencyId, amount } = call.asV2011
        return {
            currency: currencyId,
            to: dest.value as Uint8Array,
            amount,
        }
    } else if (call.isV2022) {
        const { dest, currencyId, amount } = call.asV2022
        return {
            currency: currencyId,
            to: dest.value as Uint8Array,
            amount,
        }
    } else if (call.isV2042) {
        const { dest, currencyId, amount } = call.asV2042
        return {
            currency: currencyId,
            to: dest.value as Uint8Array,
            amount,
        }
    } else if (call.isV2080) {
        const { dest, currencyId, amount } = call.asV2080
        return {
            currency: currencyId,
            to: dest.value as Uint8Array,
            amount,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleTransfer(ctx: CallHandlerContext) {
    const data = getEventData(ctx)

    const accountId = getOriginAccountId(ctx.call.origin)
    if (!accountId) return

    const token = await getToken(ctx, data.currency)
    if (!token) {
        ctx.log.warn('No token')
        return
    }

    await saveTransfer(ctx, {
        id: ctx.call.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.extrinsic.hash,
        fromId: accountId,
        toId: isAdressSS58(data.to) ? encodeId(data.to) : null,
        asset: {
            amount: data.amount,
            symbol: token.symbol,
        },
        success: ctx.call.success,
        type: TransferType.Currency,
    })
}

async function getToken(
    ctx: CommonHandlerContext,
    currency: CurrencyId
): Promise<{ symbol: string; decimals: number } | undefined> {
    switch (currency.__kind) {
        case 'Token': {
            const token =
                nativeTokens.get(currency.value.__kind) ||
                (await storage.assetRegestry.getAssetMetadatas(ctx, {
                    type: currency.__kind,
                    value: currency.value,
                }))
            assert(token != null, `Token ${currency.value} not found at block ${ctx.block.height}`)

            return token
        }
        case 'ForeignAsset':
        case 'LiquidCrowdloan': {
            const token = await storage.assetRegestry.getAssetMetadatas(ctx, {
                type: currency.__kind,
                value: currency.value,
            })
            assert(token != null, `${currency.__kind} ${currency.value} not found at block ${ctx.block.height}`)

            return token
        }
        case 'DexShare': {
            return await getToken(ctx, currency.value[0])
        }
        case 'StableAssetPoolToken': {
            const token = await storage.assetRegestry.getAssetMetadatas(ctx, {
                type: 'StableAsset',
                value: currency.value,
            })
            assert(token != null, `StableAsset ${currency.value} not found at block ${ctx.block.height}`)

            return token
        }
        default:
            // throw new Error(`Unknown currency type ${currency.__kind} at block ${ctx.block.height}`)
            return undefined
    }
}
