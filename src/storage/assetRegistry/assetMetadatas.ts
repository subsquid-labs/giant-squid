import { UnknownVersionError } from '../../common/errors'
import { AssetRegistryAssetMetadatasStorage } from '../../types/generated/storage'
import { BlockContext } from '../../types/generated/support'
import * as v2042 from '../../types/generated/v2042'
import * as v2000 from '../../types/generated/v2000'
import * as v2011 from '../../types/generated/v2011'
import * as v2022 from '../../types/generated/v2022'
import * as v2080 from '../../types/generated/v2080'

interface StorageData {
    name: Uint8Array
    symbol: Uint8Array
    decimals: number
    minimalBalance: bigint
}

type TokenSymbol = v2000.TokenSymbol | v2011.TokenSymbol | v2022.TokenSymbol | v2042.TokenSymbol | v2080.TokenSymbol

type AssetId =
    | {
          __kind: 'Erc20'
          value: Uint8Array
      }
    | {
          __kind: 'StableAssetId'
          value: number
      }
    | {
          __kind: 'ForeignAssetId'
          value: number
      }
    | {
          __kind: 'NativeAssetId'
          value: {
              __kind: 'Token'
              value: TokenSymbol
          }
      }
    | {
          __kind: 'NativeAssetId'
          value: {
              __kind: 'LiquidCrowdloan'
              value: number
          }
      }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getStorageData(ctx: BlockContext, key: any): Promise<StorageData | undefined> {
    const storage = new AssetRegistryAssetMetadatasStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV2011) {
        if (typeof key.value !== 'number') return undefined
        return await storage.getAsV2011(key.value)
    } else if (storage.isV2020) {
        if (key.__kind === 'NativeAssetId') return undefined
        return await storage.getAsV2020(key)
    } else if (storage.isV2042) {
        return await storage.getAsV2042(key)
    } else if (storage.isV2080) {
        return await storage.getAsV2080(key)
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

interface AssetMetadata {
    name: string
    symbol: string
    decimals: number
    minimalBalance: bigint
}

type Asset =
    | {
          type: 'Erc20'
          value: string
      }
    | {
          type: 'StableAsset'
          value: number
      }
    | {
          type: 'ForeignAsset'
          value: number
      }
    | {
          type: 'Token'
          value: TokenSymbol
      }
    | {
          type: 'LiquidCrowdloan'
          value: number
      }

export async function getAssetMetadatas(ctx: BlockContext, asset: Asset): Promise<AssetMetadata | undefined> {
    const key: AssetId = (() => {
        switch (asset.type) {
            case 'Erc20':
                return {
                    __kind: 'Erc20',
                    value: Buffer.from(asset.value.slice(2), 'hex'),
                }
            case 'ForeignAsset':
                return {
                    __kind: 'ForeignAssetId',
                    value: asset.value,
                }
            case 'StableAsset':
                return {
                    __kind: 'StableAssetId',
                    value: asset.value,
                }
            case 'Token':
                return {
                    __kind: 'NativeAssetId',
                    value: {
                        __kind: asset.type,
                        value: asset.value,
                    },
                }
            case 'LiquidCrowdloan':
                return {
                    __kind: 'NativeAssetId',
                    value: {
                        __kind: 'LiquidCrowdloan',
                        value: asset.value,
                    },
                }
        }
    })()

    const data = await getStorageData(ctx, key)
    if (!data) return undefined

    return {
        name: Buffer.from(data.name).toString('ascii'),
        symbol: Buffer.from(data.symbol).toString('ascii'),
        decimals: data.decimals,
        minimalBalance: data.minimalBalance,
    }
}
