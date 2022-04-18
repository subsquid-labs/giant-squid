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
