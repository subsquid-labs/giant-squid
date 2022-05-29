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

export class GrandpaNewAuthoritiesEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'grandpa.NewAuthorities')
  }

  /**
   *  New authority set has been applied. \[authority_set\]
   */
  get isV13(): boolean {
    return this.ctx._chain.getEventHash('grandpa.NewAuthorities') === 'a1a8c88e19b8fedde4aab1bef41aa9e1bdfc3748b1e39f7ad5bb09d0347d9505'
  }

  /**
   *  New authority set has been applied. \[authority_set\]
   */
  get asV13(): [Uint8Array, bigint][] {
    assert(this.isV13)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * New authority set has been applied.
   */
  get isV29(): boolean {
    return this.ctx._chain.getEventHash('grandpa.NewAuthorities') === 'e25505d283e6b21359efad4ea3b01da035cbbe2b268fd3cbfb12ca0b5577a9de'
  }

  /**
   * New authority set has been applied.
   */
  get asV29(): {authoritySet: [v29.Public, bigint][]} {
    assert(this.isV29)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV29
  }

  get asLatest(): {authoritySet: [v29.Public, bigint][]} {
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

export class StakingEraPaidEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.EraPaid')
  }

  /**
   * The era payout has been set; the first balance is the validator-payout; the second is
   * the remainder from the maximum amount of reward.
   * \[era_index, validator_payout, remainder\]
   */
  get isV29(): boolean {
    return this.ctx._chain.getEventHash('staking.EraPaid') === '1b75f96f7f74feed246668e0244abf707060018d56d88b1a638f75594d2a8005'
  }

  /**
   * The era payout has been set; the first balance is the validator-payout; the second is
   * the remainder from the maximum amount of reward.
   * \[era_index, validator_payout, remainder\]
   */
  get asV29(): [number, bigint, bigint] {
    assert(this.isV29)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV29
  }

  get asLatest(): [number, bigint, bigint] {
    deprecateLatest()
    return this.asV29
  }
}

export class StakingPayoutStartedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.PayoutStarted')
  }

  /**
   * The stakers' rewards are getting paid. \[era_index, validator_stash\]
   */
  get isV29(): boolean {
    return this.ctx._chain.getEventHash('staking.PayoutStarted') === '0379562584d6426ccff49705dfa9dba95ad94215b772fd97d0ad0c4ca0001c12'
  }

  /**
   * The stakers' rewards are getting paid. \[era_index, validator_stash\]
   */
  get asV29(): [number, v29.AccountId32] {
    assert(this.isV29)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV29
  }

  get asLatest(): [number, v29.AccountId32] {
    deprecateLatest()
    return this.asV29
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

export class StakingRewardedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Rewarded')
  }

  /**
   * The nominator has been rewarded by this amount. \[stash, amount\]
   */
  get isV29(): boolean {
    return this.ctx._chain.getEventHash('staking.Rewarded') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   * The nominator has been rewarded by this amount. \[stash, amount\]
   */
  get asV29(): [v29.AccountId32, bigint] {
    assert(this.isV29)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV29
  }

  get asLatest(): [v29.AccountId32, bigint] {
    deprecateLatest()
    return this.asV29
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

export class StakingSlashedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Slashed')
  }

  /**
   * One validator (and its nominators) has been slashed by the given amount.
   * \[validator, amount\]
   */
  get isV29(): boolean {
    return this.ctx._chain.getEventHash('staking.Slashed') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   * One validator (and its nominators) has been slashed by the given amount.
   * \[validator, amount\]
   */
  get asV29(): [v29.AccountId32, bigint] {
    assert(this.isV29)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV29
  }

  get asLatest(): [v29.AccountId32, bigint] {
    deprecateLatest()
    return this.asV29
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

export class StakingWithdrawnEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Withdrawn')
  }

  /**
   *  An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
   *  from the unlocking queue. \[stash, amount\]
   */
  get isV13(): boolean {
    return this.ctx._chain.getEventHash('staking.Withdrawn') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
   *  from the unlocking queue. \[stash, amount\]
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
