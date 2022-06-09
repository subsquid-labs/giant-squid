import type {Result} from './support'

export type AccountId = Uint8Array

export type EraIndex = number

export interface StakingLedger {
  stash: AccountId
  total: bigint
  active: bigint
  unlocking: UnlockChunk[]
  claimedRewards: EraIndex[]
}

export interface UnlockChunk {
  value: bigint
  era: number
}
