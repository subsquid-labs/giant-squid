import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v29 from './v29'

export class BalancesTransferEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Transfer')
  }

  /**
   *  Transfer succeeded. \[from, to, value\]
   */
  get isV13(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
  }

  /**
   *  Transfer succeeded. \[from, to, value\]
   */
  get asV13(): [Uint8Array, Uint8Array, bigint] {
    assert(this.isV13)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV29(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
  }

  /**
   * Transfer succeeded.
   */
  get asV29(): {from: v29.AccountId32, to: v29.AccountId32, amount: bigint} {
    assert(this.isV29)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV29
  }

  get asLatest(): {from: v29.AccountId32, to: v29.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV29
  }
}

export class StakingBondedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Bonded')
  }

  /**
   *  An account has bonded this amount. \[stash, amount\]
   * 
   *  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
   *  it will not be emitted for staking rewards when they are added to stake.
   */
  get isV13(): boolean {
    return this.ctx._chain.getEventHash('staking.Bonded') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  An account has bonded this amount. \[stash, amount\]
   * 
   *  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
   *  it will not be emitted for staking rewards when they are added to stake.
   */
  get asV13(): [Uint8Array, bigint] {
    assert(this.isV13)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV13
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV13
  }
}

export class StakingRewardEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Reward')
  }

  /**
   *  The staker has been rewarded by this amount. \[stash, amount\]
   */
  get isV13(): boolean {
    return this.ctx._chain.getEventHash('staking.Reward') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  The staker has been rewarded by this amount. \[stash, amount\]
   */
  get asV13(): [Uint8Array, bigint] {
    assert(this.isV13)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV13
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV13
  }
}

export class StakingSlashEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Slash')
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   *  \[validator, amount\]
   */
  get isV13(): boolean {
    return this.ctx._chain.getEventHash('staking.Slash') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   *  \[validator, amount\]
   */
  get asV13(): [Uint8Array, bigint] {
    assert(this.isV13)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV13
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV13
  }
}

export class StakingUnbondedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Unbonded')
  }

  /**
   *  An account has unbonded this amount. \[stash, amount\]
   */
  get isV13(): boolean {
    return this.ctx._chain.getEventHash('staking.Unbonded') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  An account has unbonded this amount. \[stash, amount\]
   */
  get asV13(): [Uint8Array, bigint] {
    assert(this.isV13)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV13
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV13
  }
}
