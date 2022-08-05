import assert from 'assert'
import {
    Transfer,
    TransferLocationAccount,
    TransferAssetToken,
    AccountTransfer,
    TransferDirection,
    TransferLocationXcm,
    TransferAssetMultiToken,
    TransferType,
} from '../../../model'
import { CommonHandlerContext } from '../../types/contexts'
import { ActionData } from '../../types/data'
import { getMeta } from '../../util/actions'
import { getOrCreateAccount } from '../../util/entities'
import { getXcmTeleportAssets } from './getters'

type XcmTransferEventData = ReturnType<typeof getXcmTeleportAssets>

export function getBeneficiare(value: XcmTransferEventData['beneficiary']) {
    const version = value.__kind

    switch (version) {
        case 'V0': {
            const location = value.value
            assert(location.__kind === 'X1', `Unsupported location variant ${location.__kind}`)

            const junction = location.value

            switch (junction.__kind) {
                case 'AccountId32':
                    return junction.id
                case 'AccountKey20':
                    return junction.key
                default:
                    throw new Error(`Unsupported junction variant ${junction.__kind}`)
            }
        }
        case 'V1': {
            const location = value.value
            assert(
                location.interior.__kind === 'X1',
                `Unsupported location interior variant ${location.interior.__kind}`
            )

            const junction = location.interior.value

            switch (junction.__kind) {
                case 'AccountId32':
                    return junction.id
                case 'AccountKey20':
                    return junction.key
                default:
                    throw new Error(`Unsupported junction variant ${junction.__kind}`)
            }
        }
        default:
            throw new Error()
    }
}

export function getDestination(value: XcmTransferEventData['dest']) {
    const version = value.__kind

    switch (version) {
        case 'V0': {
            const location = value.value
            assert(location.__kind === 'X1', `Unsupported location variant ${location.__kind}`)

            const junction = location.value
            assert(junction.__kind === 'Parachain', `Unsupported junction variant ${junction.__kind}`)

            return junction.value
        }
        case 'V1': {
            const location = value.value
            assert(
                location.interior.__kind === 'X1',
                `Unsupported location interior variant ${location.interior.__kind}`
            )

            const junction = location.interior.value
            assert(junction.__kind === 'Parachain', `Unsupported junction variant ${junction.__kind}`)

            return junction.value
        }
        default:
            throw new Error()
    }
}

export function getAssets(value: XcmTransferEventData['assets']) {
    const version = value.__kind

    switch (version) {
        case 'V0': {
            return value.value.map((asset) => {
                assert(asset.__kind === 'ConcreteFungible', `Unsupported asset variant ${asset.__kind}`)

                if (asset.id.__kind === 'X1') {
                    assert(asset.id.value.__kind === 'Parent', `Unsupported asset id variant ${asset.id.value.__kind}`)
                    return {
                        id: null,
                        amount: asset.amount,
                    }
                } else {
                    assert(asset.id.__kind === 'Null', `Unsupported asset id variant ${asset.id.__kind}`)
                    return {
                        id: null,
                        amount: asset.amount,
                    }
                }
            })
        }
        case 'V1': {
            return value.value.map((asset) => {
                assert(asset.id.__kind === 'Concrete', `Unsupported asset variant ${asset.id.__kind}`)

                assert(
                    asset.id.value.interior.__kind === 'Here',
                    `Unsupported asset id variant ${asset.id.value.interior.__kind}`
                )

                const fun = (asset as any).fungibility || (asset as any).fun

                assert(fun.__kind === 'Fungible', `Unsupported asset fungibility variant ${fun.__kind}`)

                return {
                    amount: fun.value as bigint,
                }
            })
        }
        default:
            throw new Error()
    }
}

export interface XcmTransferData extends ActionData {
    fromId: string
    to: {
        paraId: number
        id: string
    }
    assets: {
        symbol: string
        amount: bigint
    }[]
}

export async function saveXcmTransfer(ctx: CommonHandlerContext, data: XcmTransferData) {
    const { fromId, to, assets } = data

    const from = await getOrCreateAccount(ctx, fromId)

    const transfer = new Transfer({
        ...getMeta(data),
        from: new TransferLocationAccount({
            id: fromId,
        }),
        to: new TransferLocationXcm(to),
        asset:
            assets.length > 1
                ? new TransferAssetMultiToken({ tokens: assets.map((a) => new TransferAssetToken(a)) })
                : new TransferAssetToken(assets[0]),
        type: TransferType.Xcm,
        success: true,
    })

    await ctx.store.insert(transfer)

    await ctx.store.insert(
        new AccountTransfer({
            id: `${transfer.id}-from`,
            transfer,
            account: from,
            direction: TransferDirection.From,
        })
    )
}
