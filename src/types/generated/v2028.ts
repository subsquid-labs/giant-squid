import type {Result} from './support'

export type GenericMultiAddress = GenericMultiAddress_Id | GenericMultiAddress_Index | GenericMultiAddress_Raw | GenericMultiAddress_Address32 | GenericMultiAddress_Address20

export interface GenericMultiAddress_Id {
  __kind: 'Id'
  value: Uint8Array
}

export interface GenericMultiAddress_Index {
  __kind: 'Index'
  value: number
}

export interface GenericMultiAddress_Raw {
  __kind: 'Raw'
  value: Uint8Array
}

export interface GenericMultiAddress_Address32 {
  __kind: 'Address32'
  value: Uint8Array
}

export interface GenericMultiAddress_Address20 {
  __kind: 'Address20'
  value: Uint8Array
}

export type RewardDestination = RewardDestination_Staked | RewardDestination_Stash | RewardDestination_Controller | RewardDestination_Account | RewardDestination_None

export interface RewardDestination_Staked {
  __kind: 'Staked'
  value: null
}

export interface RewardDestination_Stash {
  __kind: 'Stash'
  value: null
}

export interface RewardDestination_Controller {
  __kind: 'Controller'
  value: null
}

export interface RewardDestination_Account {
  __kind: 'Account'
  value: Uint8Array
}

export interface RewardDestination_None {
  __kind: 'None'
  value: null
}
