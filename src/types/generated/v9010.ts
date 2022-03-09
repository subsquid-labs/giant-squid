import type {Result} from './support'

export type MultiSignature = MultiSignature_Ed25519 | MultiSignature_Sr25519 | MultiSignature_Ecdsa

export interface MultiSignature_Ed25519 {
  __kind: 'Ed25519'
  value: Uint8Array
}

export interface MultiSignature_Sr25519 {
  __kind: 'Sr25519'
  value: Uint8Array
}

export interface MultiSignature_Ecdsa {
  __kind: 'Ecdsa'
  value: Uint8Array
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
