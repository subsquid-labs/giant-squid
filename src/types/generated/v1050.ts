import type {Result} from './support'

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

export interface StakingLedgerTo240 {
  stash: Uint8Array
  total: bigint
  active: bigint
  unlocking: UnlockChunk[]
  lastReward: (number | undefined)
}

export interface UnlockChunk {
  value: bigint
  era: number
}
