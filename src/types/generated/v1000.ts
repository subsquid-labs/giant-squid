import type {Result} from './support'

export type LookupSource = LookupSource_Id | LookupSource_Index | LookupSource_Raw | LookupSource_Address32 | LookupSource_Address20

export interface LookupSource_Id {
  __kind: 'Id'
  value: AccountId
}

export interface LookupSource_Index {
  __kind: 'Index'
  value: number
}

export interface LookupSource_Raw {
  __kind: 'Raw'
  value: Uint8Array
}

export interface LookupSource_Address32 {
  __kind: 'Address32'
  value: H256
}

export interface LookupSource_Address20 {
  __kind: 'Address20'
  value: H160
}

export type CurrencyIdOf = CurrencyIdOf_Token | CurrencyIdOf_DEXShare | CurrencyIdOf_ERC20 | CurrencyIdOf_StableAssetPoolToken | CurrencyIdOf_LiquidCroadloan | CurrencyIdOf_ForeignAsset

export interface CurrencyIdOf_Token {
  __kind: 'Token'
  value: TokenSymbol
}

export interface CurrencyIdOf_DEXShare {
  __kind: 'DEXShare'
  value: [DexShare, DexShare]
}

export interface CurrencyIdOf_ERC20 {
  __kind: 'ERC20'
  value: EvmAddress
}

export interface CurrencyIdOf_StableAssetPoolToken {
  __kind: 'StableAssetPoolToken'
  value: number
}

export interface CurrencyIdOf_LiquidCroadloan {
  __kind: 'LiquidCroadloan'
  value: number
}

export interface CurrencyIdOf_ForeignAsset {
  __kind: 'ForeignAsset'
  value: number
}

export type AccountId = Uint8Array

export type H256 = Uint8Array

export type H160 = Uint8Array

export type TokenSymbol = TokenSymbol_ACA | TokenSymbol_AUSD | TokenSymbol_DOT | TokenSymbol_LDOT | TokenSymbol_RENBTC | TokenSymbol_KAR | TokenSymbol_KUSD | TokenSymbol_KSM | TokenSymbol_LKSM | TokenSymbol_CASH

export interface TokenSymbol_ACA {
  __kind: 'ACA'
}

export interface TokenSymbol_AUSD {
  __kind: 'AUSD'
}

export interface TokenSymbol_DOT {
  __kind: 'DOT'
}

export interface TokenSymbol_LDOT {
  __kind: 'LDOT'
}

export interface TokenSymbol_RENBTC {
  __kind: 'RENBTC'
}

export interface TokenSymbol_KAR {
  __kind: 'KAR'
}

export interface TokenSymbol_KUSD {
  __kind: 'KUSD'
}

export interface TokenSymbol_KSM {
  __kind: 'KSM'
}

export interface TokenSymbol_LKSM {
  __kind: 'LKSM'
}

export interface TokenSymbol_CASH {
  __kind: 'CASH'
}

export type DexShare = DexShare_Token | DexShare_Erc20

export interface DexShare_Token {
  __kind: 'Token'
  value: TokenSymbol
}

export interface DexShare_Erc20 {
  __kind: 'Erc20'
  value: EvmAddress
}

export type EvmAddress = Uint8Array
