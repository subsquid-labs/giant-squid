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

export type CurrencyId = CurrencyId_Token | CurrencyId_DEXShare | CurrencyId_ERC20 | CurrencyId_StableAssetPoolToken | CurrencyId_LiquidCroadloan | CurrencyId_ForeignAsset

export interface CurrencyId_Token {
  __kind: 'Token'
  value: TokenSymbol
}

export interface CurrencyId_DEXShare {
  __kind: 'DEXShare'
  value: [DexShare, DexShare]
}

export interface CurrencyId_ERC20 {
  __kind: 'ERC20'
  value: EvmAddress
}

export interface CurrencyId_StableAssetPoolToken {
  __kind: 'StableAssetPoolToken'
  value: number
}

export interface CurrencyId_LiquidCroadloan {
  __kind: 'LiquidCroadloan'
  value: number
}

export interface CurrencyId_ForeignAsset {
  __kind: 'ForeignAsset'
  value: number
}

export type Balance = bigint

export type MultiLocation = MultiLocation_Here | MultiLocation_X1 | MultiLocation_X2 | MultiLocation_X3 | MultiLocation_X4 | MultiLocation_X5 | MultiLocation_X6 | MultiLocation_X7 | MultiLocation_X8

export interface MultiLocation_Here {
  __kind: 'Here'
  value: null
}

export interface MultiLocation_X1 {
  __kind: 'X1'
  value: JunctionV0
}

export interface MultiLocation_X2 {
  __kind: 'X2'
  value: [JunctionV0, JunctionV0]
}

export interface MultiLocation_X3 {
  __kind: 'X3'
  value: [JunctionV0, JunctionV0, JunctionV0]
}

export interface MultiLocation_X4 {
  __kind: 'X4'
  value: [JunctionV0, JunctionV0, JunctionV0, JunctionV0]
}

export interface MultiLocation_X5 {
  __kind: 'X5'
  value: [JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0]
}

export interface MultiLocation_X6 {
  __kind: 'X6'
  value: [JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0]
}

export interface MultiLocation_X7 {
  __kind: 'X7'
  value: [JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0]
}

export interface MultiLocation_X8 {
  __kind: 'X8'
  value: [JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0]
}

export type Weight = bigint

export type AccountId = Uint8Array

export type H256 = Uint8Array

export type H160 = Uint8Array

export type TokenSymbol = TokenSymbol_ACA | TokenSymbol_AUSD | TokenSymbol_DOT | TokenSymbol_LDOT | TokenSymbol_RENBTC | TokenSymbol_CASH | TokenSymbol_KAR | TokenSymbol_KUSD | TokenSymbol_KSM | TokenSymbol_LKSM | TokenSymbol_BNC | TokenSymbol_VSKSM

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

export interface TokenSymbol_CASH {
  __kind: 'CASH'
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

export interface TokenSymbol_BNC {
  __kind: 'BNC'
}

export interface TokenSymbol_VSKSM {
  __kind: 'VSKSM'
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

export type JunctionV0 = JunctionV0_Parent | JunctionV0_Parachain | JunctionV0_AccountId32 | JunctionV0_AccountIndex64 | JunctionV0_AccountKey20 | JunctionV0_PalletInstance | JunctionV0_GeneralIndex | JunctionV0_GeneralKey | JunctionV0_OnlyChild | JunctionV0_Plurality

export interface JunctionV0_Parent {
  __kind: 'Parent'
  value: null
}

export interface JunctionV0_Parachain {
  __kind: 'Parachain'
  value: number
}

export interface JunctionV0_AccountId32 {
  __kind: 'AccountId32'
  network: NetworkId
  id: AccountId
}

export interface JunctionV0_AccountIndex64 {
  __kind: 'AccountIndex64'
  network: NetworkId
  index: bigint
}

export interface JunctionV0_AccountKey20 {
  __kind: 'AccountKey20'
  network: NetworkId
  key: Uint8Array
}

export interface JunctionV0_PalletInstance {
  __kind: 'PalletInstance'
  value: number
}

export interface JunctionV0_GeneralIndex {
  __kind: 'GeneralIndex'
  value: bigint
}

export interface JunctionV0_GeneralKey {
  __kind: 'GeneralKey'
  value: Uint8Array
}

export interface JunctionV0_OnlyChild {
  __kind: 'OnlyChild'
  value: null
}

export interface JunctionV0_Plurality {
  __kind: 'Plurality'
  id: BodyId
  part: BodyPart
}

export type NetworkId = NetworkId_Any | NetworkId_Named | NetworkId_Polkadot | NetworkId_Kusama

export interface NetworkId_Any {
  __kind: 'Any'
  value: null
}

export interface NetworkId_Named {
  __kind: 'Named'
  value: Uint8Array
}

export interface NetworkId_Polkadot {
  __kind: 'Polkadot'
  value: null
}

export interface NetworkId_Kusama {
  __kind: 'Kusama'
  value: null
}

export type BodyId = BodyId_Unit | BodyId_Named | BodyId_Index | BodyId_Executive | BodyId_Technical | BodyId_Legislative | BodyId_Judicial

export interface BodyId_Unit {
  __kind: 'Unit'
  value: null
}

export interface BodyId_Named {
  __kind: 'Named'
  value: Uint8Array
}

export interface BodyId_Index {
  __kind: 'Index'
  value: number
}

export interface BodyId_Executive {
  __kind: 'Executive'
  value: null
}

export interface BodyId_Technical {
  __kind: 'Technical'
  value: null
}

export interface BodyId_Legislative {
  __kind: 'Legislative'
  value: null
}

export interface BodyId_Judicial {
  __kind: 'Judicial'
  value: null
}

export type BodyPart = BodyPart_Voice | BodyPart_Members | BodyPart_Fraction | BodyPart_AtLeastProportion | BodyPart_MoreThanProportion

export interface BodyPart_Voice {
  __kind: 'Voice'
  value: null
}

export interface BodyPart_Members {
  __kind: 'Members'
  value: number
}

export interface BodyPart_Fraction {
  __kind: 'Fraction'
  nom: number
  denom: number
}

export interface BodyPart_AtLeastProportion {
  __kind: 'AtLeastProportion'
  nom: number
  denom: number
}

export interface BodyPart_MoreThanProportion {
  __kind: 'MoreThanProportion'
  nom: number
  denom: number
}
