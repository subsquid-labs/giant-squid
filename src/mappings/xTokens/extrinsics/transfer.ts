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

function getCallData(ctx: ExtrinsicHandlerContext): EventData {
    const call = new XTokensTransferCall(ctx)
    if (call.isV2000) {
        return call.asV2000
    } else if (call.isV2011) {
        return call.asV2011
    } else if (call.isV2022) {
        return call.asV2022
    } else if (call.isV2042) {
        return call.asV2042
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleTransfer(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    const asset = await getAsset(ctx, data)
    const to = await getDest(ctx, data)

    const id = ctx.event.id

    ctx.store.insert(
        XcmTransfer,
        new XcmTransfer({
            id,
            ...getMeta(ctx),
            from: await accountManager.get(ctx, ctx.extrinsic.signer),
            to,
            asset,
        })
    )
}

type AssetData = Pick<EventData, 'amount' | 'currencyId'>

async function getAsset(ctx: ExtrinsicHandlerContext, data: AssetData): Promise<XcmAsset> {
    const { currencyId, amount } = data
    switch (currencyId.__kind) {
        case 'Token': {
            return new XcmAsset({
                token: currencyId.value.__kind,
                amount,
            })
        }
        case 'ForeignAsset': {
            const token = (
                await storage.assetRegestry.getAssetMetadatas(ctx, {
                    type: 'ForeignAsset',
                    value: currencyId.value,
                })
            )?.symbol
            assert(token != null)

            return new XcmAsset({
                token,
                amount,
            })
        }
        default:
            throw new Error(`Unknown currency type ${currencyId.__kind}`)
    }
}

type DestData = Pick<EventData, 'dest'>

async function getDest(ctx: ExtrinsicHandlerContext, data: DestData): Promise<XcmDestinationAccount> {
    const { dest } = data

    const interior = dest.__kind === 'V0' ? dest.value : dest.value.interior

    switch (interior.__kind) {
        case 'X1': {
            const id = getAccountId(interior.value)
            assert(id != null)

            return new XcmDestinationAccount({
                paraId: null,
                id,
            })
        }
        case 'X2': {
            const paraId = interior.value[0].__kind === 'Parachain' ? interior.value[0].value : undefined
            assert(paraId != null)

            const id = getAccountId(interior.value[1])
            assert(id != null)

            return new XcmDestinationAccount({
                paraId,
                id,
            })
        }
        default:
            throw new Error(`Unknown dest case ${interior}`)
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAccountId(data: any): string | undefined {
    switch (data.__kind) {
        case 'AccountId32':
            return toHex(data.id)
        case 'AccountKey20':
            return toHex(data.key)
        default:
            return undefined
    }
}
