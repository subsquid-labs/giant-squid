import type {Result} from './support'

export type AccountId = Uint8Array

export type Balance = bigint

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

export interface ActiveEraInfo {
  index: EraIndex
  start: (Moment | undefined)
}

export type EraIndex = number

export interface Exposure {
  total: bigint
  own: bigint
  others: IndividualExposure[]
}

export interface StakingLedger {
  stash: AccountId
  total: bigint
  active: bigint
  unlocking: UnlockChunk[]
  lastReward: (EraIndex | undefined)
}

export type Moment = bigint

export interface IndividualExposure {
  who: AccountId
  value: bigint
}

export interface UnlockChunk {
  value: bigint
  era: number
}
