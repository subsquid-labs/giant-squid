import type {Result} from './support'

export type AccountId = Uint8Array

export type ParaId = number

export type Balance = bigint

export type MultiSignature = MultiSignature_Ed25519 | MultiSignature_Sr25519 | MultiSignature_Ecdsa

export interface MultiSignature_Ed25519 {
  __kind: 'Ed25519'
  value: Ed25519Signature
}

export interface MultiSignature_Sr25519 {
  __kind: 'Sr25519'
  value: Sr25519Signature
}

export interface MultiSignature_Ecdsa {
  __kind: 'Ecdsa'
  value: EcdsaSignature
}

export type MultiSigner = MultiSigner_Ed25519 | MultiSigner_Sr25519 | MultiSigner_Ecdsa

export interface MultiSigner_Ed25519 {
  __kind: 'Ed25519'
  value: Uint8Array
}

export interface MultiSigner_Sr25519 {
  __kind: 'Sr25519'
  value: Uint8Array
}

export interface MultiSigner_Ecdsa {
  __kind: 'Ecdsa'
  value: Uint8Array
}

export interface FundInfo {
  depositor: AccountId
  verifier: (MultiSigner | undefined)
  deposit: Balance
  raised: Balance
  end: BlockNumber
  cap: Balance
  lastContribution: LastContribution
  firstPeriod: LeasePeriod
  lastPeriod: LeasePeriod
  trieIndex: TrieIndex
}

export type Ed25519Signature = Uint8Array

export type Sr25519Signature = Uint8Array

export type EcdsaSignature = Uint8Array

export type BlockNumber = number

export type LastContribution = LastContribution_Never | LastContribution_PreEnding | LastContribution_Ending

export interface LastContribution_Never {
  __kind: 'Never'
  value: null
}

export interface LastContribution_PreEnding {
  __kind: 'PreEnding'
  value: number
}

export interface LastContribution_Ending {
  __kind: 'Ending'
  value: BlockNumber
}

export type LeasePeriod = number

export type TrieIndex = number
