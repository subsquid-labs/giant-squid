import type {Result} from './support'

export type MultiAddress = MultiAddress_Id | MultiAddress_Index | MultiAddress_Raw | MultiAddress_Address32 | MultiAddress_Address20

export interface MultiAddress_Id {
  __kind: 'Id'
  value: AccountId32
}

export interface MultiAddress_Index {
  __kind: 'Index'
  value: null
}

export interface MultiAddress_Raw {
  __kind: 'Raw'
  value: Uint8Array
}

export interface MultiAddress_Address32 {
  __kind: 'Address32'
  value: Uint8Array
}

export interface MultiAddress_Address20 {
  __kind: 'Address20'
  value: Uint8Array
}

export type RewardDestination = RewardDestination_Staked | RewardDestination_Stash | RewardDestination_Controller | RewardDestination_Account | RewardDestination_None

export interface RewardDestination_Staked {
  __kind: 'Staked'
}

export interface RewardDestination_Stash {
  __kind: 'Stash'
}

export interface RewardDestination_Controller {
  __kind: 'Controller'
}

export interface RewardDestination_Account {
  __kind: 'Account'
  value: AccountId32
}

export interface RewardDestination_None {
  __kind: 'None'
}

export type AccountId32 = Uint8Array
