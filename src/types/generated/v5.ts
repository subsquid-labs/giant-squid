import type {Result} from './support'

export type LookupSource = Uint8Array

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
  value: AccountId
}

export interface RewardDestination_None {
  __kind: 'None'
  value: null
}

export interface ValidatorPrefs {
  commission: number
}

export type AccountId = Uint8Array
