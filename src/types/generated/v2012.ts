import type {Result} from './support'

export type AssetIds = AssetIds_Erc20 | AssetIds_StableAssetId | AssetIds_ForeignAssetId

export interface AssetIds_Erc20 {
  __kind: 'Erc20'
  value: H160
}

export interface AssetIds_StableAssetId {
  __kind: 'StableAssetId'
  value: number
}

export interface AssetIds_ForeignAssetId {
  __kind: 'ForeignAssetId'
  value: number
}

export interface AssetMetadata {
  name: Uint8Array
  symbol: Uint8Array
  decimals: number
  minimalBalance: bigint
}

export type H160 = Uint8Array
