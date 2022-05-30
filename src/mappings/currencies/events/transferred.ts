import { EventHandlerContext } from '@subsquid/substrate-processor'
import { CurrenciesTransferredEvent } from '../../../types/generated/events'
import { CurrencyId as CurrencyIdv2042 } from '../../../types/generated/v2042'
import { CurrencyId as CurrencyIdv2011 } from '../../../types/generated/v2011'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId, getMeta } from '../../../common/helpers'
import { accountManager } from '../../../managers'
import {
    Transfer,
    TransferLocationAccount,
    TransferAssetToken,
    TransferType,
    AccountTransfer,
    TransferDirection,
} from '../../../model'
import { nativeTokens } from '../../../common/tokens'
import assert from 'assert'
import storage from '../../../storage'

type CurrencyId = CurrencyIdv2042 | CurrencyIdv2011

interface EventData {
    currency: CurrencyId
    from: Uint8Array
    to: Uint8Array
    amount: bigint
}

function getEventData(ctx: EventHandlerContext): EventData {
    const call = new CurrenciesTransferredEvent(ctx)
    if (call.isV2000) {
        const [currency, from, to, amount] = call.asV2000
        return {
            currency,
            from,
            to,
            amount,
        }
    } else if (call.isV2011) {
        const [currency, from, to, amount] = call.asV2011
        return {
            currency,
            from,
            to,
            amount,
        }
    } else if (call.isV2020) {
        const { currencyId: currency, from, to, amount } = call.asV2020
        return {
            currency,
            from,
            to,
            amount,
        }
    } else if (call.isV2022) {
        const { currencyId: currency, from, to, amount } = call.asV2022
        return {
            currency,
            from,
            to,
            amount,
        }
    } else if (call.isV2042) {
        const { currencyId: currency, from, to, amount } = call.asV2042
        return {
            currency,
            from,
            to,
            amount,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleTransferred(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    const id = ctx.event.id

    const from = await accountManager.get(ctx, encodeId(data.from))
    const to = await accountManager.get(ctx, encodeId(data.to))

    const token = await getToken(ctx, data.currency)

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
            symbol: token.symbol,
            decimals: token.decimals,
            amount: data.amount,
        }),
        success: true,
        type: TransferType.Currency,
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

async function getToken(ctx: EventHandlerContext, currency: CurrencyId): Promise<{ symbol: string; decimals: number }> {
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
            throw new Error(`Unknown currency type ${currency.__kind} at block ${ctx.block.height}`)
    }
}
