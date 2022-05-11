import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v1001 from './v1001'
import * as v1201 from './v1201'
import * as v1300 from './v1300'

export class BalancesTransferEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Transfer')
  }

  /**
   *  Transfer succeeded. \[from, to, value\]
   */
  get isV49(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === 'dfcae516f053c47e7cb49e0718f01587efcb64cea4e3baf4c6973a29891f7841'
  }

  /**
   *  Transfer succeeded. \[from, to, value\]
   */
  get asV49(): [Uint8Array, Uint8Array, bigint] {
    assert(this.isV49)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV1201(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '23222c59f2992c12387568241620899d2d399ab9027595daca8255637f62ece3'
  }

  /**
   * Transfer succeeded.
   */
  get asV1201(): {from: v1201.AccountId20, to: v1201.AccountId20, amount: bigint} {
    assert(this.isV1201)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1201
  }

  get asLatest(): {from: v1201.AccountId20, to: v1201.AccountId20, amount: bigint} {
    deprecateLatest()
    return this.asV1201
  }
}

export class ParachainStakingCandidateBondedLessEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'parachainStaking.CandidateBondedLess')
  }

  /**
   * Candidate, Amount, New Bond
   */
  get isV1001(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.CandidateBondedLess') === '7d53ab304de2c1ff2ac70be085ea6ab305e3a4df52dde9c25829171c7376cebc'
  }

  /**
   * Candidate, Amount, New Bond
   */
  get asV1001(): [v1001.AccountId20, bigint, bigint] {
    assert(this.isV1001)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Сandidate has decreased a self bond.
   */
  get isV1300(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.CandidateBondedLess') === '03199d60c293c383f981694ba4310b187ed4a6b79fcc52e6fbccc691153b8f28'
  }

  /**
   * Сandidate has decreased a self bond.
   */
  get asV1300(): {candidate: v1300.AccountId20, amount: bigint, newBond: bigint} {
    assert(this.isV1300)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1300
  }

  get asLatest(): {candidate: v1300.AccountId20, amount: bigint, newBond: bigint} {
    deprecateLatest()
    return this.asV1300
  }
}

export class ParachainStakingCandidateBondedMoreEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'parachainStaking.CandidateBondedMore')
  }

  /**
   * Candidate, Amount, New Bond Total
   */
  get isV1001(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.CandidateBondedMore') === '7d53ab304de2c1ff2ac70be085ea6ab305e3a4df52dde9c25829171c7376cebc'
  }

  /**
   * Candidate, Amount, New Bond Total
   */
  get asV1001(): [v1001.AccountId20, bigint, bigint] {
    assert(this.isV1001)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Сandidate has increased a self bond.
   */
  get isV1300(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.CandidateBondedMore') === 'd6e6bcd7c6de9403e85285e3685e6774d7d1d129d84c7cfe9a4806c5ff5a4e54'
  }

  /**
   * Сandidate has increased a self bond.
   */
  get asV1300(): {candidate: v1300.AccountId20, amount: bigint, newTotalBond: bigint} {
    assert(this.isV1300)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1300
  }

  get asLatest(): {candidate: v1300.AccountId20, amount: bigint, newTotalBond: bigint} {
    deprecateLatest()
    return this.asV1300
  }
}

export class ParachainStakingCandidateLeftEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'parachainStaking.CandidateLeft')
  }

  /**
   * Ex-Candidate, Amount Unlocked, New Total Amt Locked
   */
  get isV1001(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.CandidateLeft') === '7d53ab304de2c1ff2ac70be085ea6ab305e3a4df52dde9c25829171c7376cebc'
  }

  /**
   * Ex-Candidate, Amount Unlocked, New Total Amt Locked
   */
  get asV1001(): [v1001.AccountId20, bigint, bigint] {
    assert(this.isV1001)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Candidate has left the set of candidates.
   */
  get isV1300(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.CandidateLeft') === '39a5d795682d6a8426e0ee9f0ed61cb5d0d803a9c4303d42f2db829df56877b2'
  }

  /**
   * Candidate has left the set of candidates.
   */
  get asV1300(): {exCandidate: v1300.AccountId20, unlockedAmount: bigint, newTotalAmtLocked: bigint} {
    assert(this.isV1300)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1300
  }

  get asLatest(): {exCandidate: v1300.AccountId20, unlockedAmount: bigint, newTotalAmtLocked: bigint} {
    deprecateLatest()
    return this.asV1300
  }
}

export class ParachainStakingDelegationEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'parachainStaking.Delegation')
  }

  /**
   * Delegator, Amount Locked, Candidate, Delegator Position with New Total Counted if in Top
   */
  get isV1001(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.Delegation') === '9e88e3dd4dec21ca4744b0264c96a88bfef8fa4f3a42c495ba697dcf51165507'
  }

  /**
   * Delegator, Amount Locked, Candidate, Delegator Position with New Total Counted if in Top
   */
  get asV1001(): [v1001.AccountId20, bigint, v1001.AccountId20, v1001.DelegatorAdded] {
    assert(this.isV1001)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * New delegation (increase of the existing one).
   */
  get isV1300(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.Delegation') === 'a85b3e0f4dad63b1b710d554a6b0a8aa64b90a755bcae7ea3f4b677b36e5df82'
  }

  /**
   * New delegation (increase of the existing one).
   */
  get asV1300(): {delegator: v1300.AccountId20, lockedAmount: bigint, candidate: v1300.AccountId20, delegatorPosition: v1300.DelegatorAdded} {
    assert(this.isV1300)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1300
  }

  get asLatest(): {delegator: v1300.AccountId20, lockedAmount: bigint, candidate: v1300.AccountId20, delegatorPosition: v1300.DelegatorAdded} {
    deprecateLatest()
    return this.asV1300
  }
}

export class ParachainStakingDelegationDecreasedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'parachainStaking.DelegationDecreased')
  }

  get isV1001(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.DelegationDecreased') === 'cb87cf94019b8ebc544a6a9a05c01f439fe3dea8cbed08c97f1a1e60dd6ad4f3'
  }

  get asV1001(): [v1001.AccountId20, v1001.AccountId20, bigint, boolean] {
    assert(this.isV1001)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV1300(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.DelegationDecreased') === '8ae2ca952b0b00ca6619c82b53d155a37de0be62eb9e8c32f4dad72b695e010b'
  }

  get asV1300(): {delegator: v1300.AccountId20, candidate: v1300.AccountId20, amount: bigint, inTop: boolean} {
    assert(this.isV1300)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1300
  }

  get asLatest(): {delegator: v1300.AccountId20, candidate: v1300.AccountId20, amount: bigint, inTop: boolean} {
    deprecateLatest()
    return this.asV1300
  }
}

export class ParachainStakingDelegationIncreasedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'parachainStaking.DelegationIncreased')
  }

  get isV1001(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.DelegationIncreased') === 'cb87cf94019b8ebc544a6a9a05c01f439fe3dea8cbed08c97f1a1e60dd6ad4f3'
  }

  get asV1001(): [v1001.AccountId20, v1001.AccountId20, bigint, boolean] {
    assert(this.isV1001)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV1300(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.DelegationIncreased') === '8ae2ca952b0b00ca6619c82b53d155a37de0be62eb9e8c32f4dad72b695e010b'
  }

  get asV1300(): {delegator: v1300.AccountId20, candidate: v1300.AccountId20, amount: bigint, inTop: boolean} {
    assert(this.isV1300)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1300
  }

  get asLatest(): {delegator: v1300.AccountId20, candidate: v1300.AccountId20, amount: bigint, inTop: boolean} {
    deprecateLatest()
    return this.asV1300
  }
}

export class ParachainStakingDelegationRevokedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'parachainStaking.DelegationRevoked')
  }

  /**
   * Delegator, Candidate, Amount Unstaked
   */
  get isV1001(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.DelegationRevoked') === 'dfcae516f053c47e7cb49e0718f01587efcb64cea4e3baf4c6973a29891f7841'
  }

  /**
   * Delegator, Candidate, Amount Unstaked
   */
  get asV1001(): [v1001.AccountId20, v1001.AccountId20, bigint] {
    assert(this.isV1001)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Delegation revoked.
   */
  get isV1300(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.DelegationRevoked') === '013eacc8d6813b22ecdad778ecfffcc25ea1f31117d857d64978c177696e8697'
  }

  /**
   * Delegation revoked.
   */
  get asV1300(): {delegator: v1300.AccountId20, candidate: v1300.AccountId20, unstakedAmount: bigint} {
    assert(this.isV1300)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1300
  }

  get asLatest(): {delegator: v1300.AccountId20, candidate: v1300.AccountId20, unstakedAmount: bigint} {
    deprecateLatest()
    return this.asV1300
  }
}

export class ParachainStakingDelegatorLeftEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'parachainStaking.DelegatorLeft')
  }

  /**
   * Delegator, Amount Unstaked
   */
  get isV1001(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.DelegatorLeft') === 'e4f02aa7cee015102b6cbc171f5d7e84370e60deba2166a27195187adde0407f'
  }

  /**
   * Delegator, Amount Unstaked
   */
  get asV1001(): [v1001.AccountId20, bigint] {
    assert(this.isV1001)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Delegator has left the set of delegators.
   */
  get isV1300(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.DelegatorLeft') === '77f204dee4c5a51e392aac1d070198e23c536d0b97569fee0484578613cd8777'
  }

  /**
   * Delegator has left the set of delegators.
   */
  get asV1300(): {delegator: v1300.AccountId20, unstakedAmount: bigint} {
    assert(this.isV1300)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1300
  }

  get asLatest(): {delegator: v1300.AccountId20, unstakedAmount: bigint} {
    deprecateLatest()
    return this.asV1300
  }
}

export class ParachainStakingDelegatorLeftCandidateEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'parachainStaking.DelegatorLeftCandidate')
  }

  /**
   * Delegator, Candidate, Amount Unstaked, New Total Amt Staked for Candidate
   */
  get isV1001(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.DelegatorLeftCandidate') === 'c5569fad693da6ab49df69c2cc3a1767b0c18bfc1f206847e0946659f6cd24ef'
  }

  /**
   * Delegator, Candidate, Amount Unstaked, New Total Amt Staked for Candidate
   */
  get asV1001(): [v1001.AccountId20, v1001.AccountId20, bigint, bigint] {
    assert(this.isV1001)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Delegation from candidate state has been remove.
   */
  get isV1300(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.DelegatorLeftCandidate') === 'f72ae455b6ae66e6fabad54fadb0ae26f7136099a377372b74890536d4007422'
  }

  /**
   * Delegation from candidate state has been remove.
   */
  get asV1300(): {delegator: v1300.AccountId20, candidate: v1300.AccountId20, unstakedAmount: bigint, totalCandidateStaked: bigint} {
    assert(this.isV1300)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1300
  }

  get asLatest(): {delegator: v1300.AccountId20, candidate: v1300.AccountId20, unstakedAmount: bigint, totalCandidateStaked: bigint} {
    deprecateLatest()
    return this.asV1300
  }
}

export class ParachainStakingJoinedCollatorCandidatesEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'parachainStaking.JoinedCollatorCandidates')
  }

  /**
   * Account, Amount Locked, New Total Amt Locked
   */
  get isV900(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.JoinedCollatorCandidates') === '7d53ab304de2c1ff2ac70be085ea6ab305e3a4df52dde9c25829171c7376cebc'
  }

  /**
   * Account, Amount Locked, New Total Amt Locked
   */
  get asV900(): [v900.H160, bigint, bigint] {
    assert(this.isV900)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Account joined the set of collator candidates.
   */
  get isV1300(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.JoinedCollatorCandidates') === '227a8d2310a3cd3b98057acb86b906dcde376e61a13f5a50db8589a31b218c17'
  }

  /**
   * Account joined the set of collator candidates.
   */
  get asV1300(): {account: v1300.AccountId20, amountLocked: bigint, newTotalAmtLocked: bigint} {
    assert(this.isV1300)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1300
  }

  get asLatest(): {account: v1300.AccountId20, amountLocked: bigint, newTotalAmtLocked: bigint} {
    deprecateLatest()
    return this.asV1300
  }
}

export class ParachainStakingNewRoundEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'parachainStaking.NewRound')
  }

  /**
   *  Starting Block, Round, Number of Collators Selected, Total Balance
   */
  get isV49(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.NewRound') === '40ffda4d99fbb38b23cc20386a7f622d64120f24ccc70b9f85ce7612cd87c3b7'
  }

  /**
   *  Starting Block, Round, Number of Collators Selected, Total Balance
   */
  get asV49(): [number, number, number, bigint] {
    assert(this.isV49)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Started new round.
   */
  get isV1300(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.NewRound') === '36b479d535ff0b4066a6ca7641a4dba5e090be428fc6b6e9fe8fec13d953fcfb'
  }

  /**
   * Started new round.
   */
  get asV1300(): {startingBlock: number, round: number, selectedCollatorsNumber: number, totalBalance: bigint} {
    assert(this.isV1300)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1300
  }

  get asLatest(): {startingBlock: number, round: number, selectedCollatorsNumber: number, totalBalance: bigint} {
    deprecateLatest()
    return this.asV1300
  }
}

export class ParachainStakingRewardedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'parachainStaking.Rewarded')
  }

  /**
   *  Paid the account (nominator or collator) the balance as liquid rewards
   */
  get isV49(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.Rewarded') === 'e4f02aa7cee015102b6cbc171f5d7e84370e60deba2166a27195187adde0407f'
  }

  /**
   *  Paid the account (nominator or collator) the balance as liquid rewards
   */
  get asV49(): [Uint8Array, bigint] {
    assert(this.isV49)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Paid the account (delegator or collator) the balance as liquid rewards.
   */
  get isV1300(): boolean {
    return this.ctx._chain.getEventHash('parachainStaking.Rewarded') === '44a7364018ebad92746e4ca7c7c23d24d5da43cda2e63a90c665b522994ef1e2'
  }

  /**
   * Paid the account (delegator or collator) the balance as liquid rewards.
   */
  get asV1300(): {account: v1300.AccountId20, rewards: bigint} {
    assert(this.isV1300)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1300
  }

  get asLatest(): {account: v1300.AccountId20, rewards: bigint} {
    deprecateLatest()
    return this.asV1300
  }
}
