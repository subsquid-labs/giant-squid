import type {Result} from './support'

export type AccountId32 = Uint8Array

export type SmartContract = SmartContract_Evm | SmartContract_Wasm

export interface SmartContract_Evm {
  __kind: 'Evm'
  value: H160
}

export interface SmartContract_Wasm {
  __kind: 'Wasm'
  value: AccountId32
}

export type H160 = Uint8Array
