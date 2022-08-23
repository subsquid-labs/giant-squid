import type {Result} from './support'

export type AccountId32 = Uint8Array

export interface AccountLedger {
  locked: bigint
  unbondingInfo: UnbondingInfo
  rewardDestination: RewardDestination
}

export interface UnbondingInfo {
  unlockingChunks: UnlockingChunk[]
}

export type RewardDestination = RewardDestination_FreeBalance | RewardDestination_StakeBalance

export interface RewardDestination_FreeBalance {
  __kind: 'FreeBalance'
}

export interface RewardDestination_StakeBalance {
  __kind: 'StakeBalance'
}

export interface UnlockingChunk {
  amount: bigint
  unlockEra: number
}
