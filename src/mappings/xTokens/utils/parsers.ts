import { ExtrinsicHandlerContext, toHex } from '@subsquid/substrate-processor'
import { assert } from 'console'
import { XcmAsset, XcmDestination } from '../../../model'
import storage from '../../../storage'
import { CurrencyId, MultiLocation } from './types'

export async function getAsset(
    ctx: ExtrinsicHandlerContext,
    currencyId: CurrencyId,
    amount: bigint
): Promise<XcmAsset> {
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
            throw new Error(`Unknown currency type ${currencyId.__kind} at block ${ctx.block.height}`)
    }
}

export async function getDest(ctx: ExtrinsicHandlerContext, multilocation: MultiLocation): Promise<XcmDestination> {
    const interior = multilocation.__kind === 'V0' ? multilocation.value : multilocation.value.interior

    const props: ConstructorParameters<typeof XcmDestination>[0] = {}

    if (interior.__kind !== 'Here' && interior.__kind !== 'Null') {
        const junctions = Array.isArray(interior.value) ? interior.value : [interior.value]

        for (const junction of junctions) {
            switch (junction.__kind) {
                case 'Parachain':
                    assert(props.paraId == null)
                    props.paraId = junction.value
                    break
                case 'AccountId32':
                    assert(props.id == null)
                    props.id = toHex(junction.id)
                    break
                case 'AccountKey20':
                    assert(props.id == null)
                    props.id = toHex(junction.key)
                    break
                default:
                    throw new Error(`Unknown junction case ${junction.__kind} at block ${ctx.block.height}`)
            }
        }
    }

    return new XcmDestination(props)
}
