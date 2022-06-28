import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'
import * as v13 from './v13'
import * as v29 from './v29'

export class GrandpaNewAuthoritiesEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Grandpa.NewAuthorities')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  New authority set has been applied. \[authority_set\]
   */
  get isV13(): boolean {
    return this._chain.getEventHash('Grandpa.NewAuthorities') === 'a1a8c88e19b8fedde4aab1bef41aa9e1bdfc3748b1e39f7ad5bb09d0347d9505'
  }

  /**
   *  New authority set has been applied. \[authority_set\]
   */
  get asV13(): v13.AuthorityList {
    assert(this.isV13)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * New authority set has been applied.
   */
  get isV29(): boolean {
    return this._chain.getEventHash('Grandpa.NewAuthorities') === 'e25505d283e6b21359efad4ea3b01da035cbbe2b268fd3cbfb12ca0b5577a9de'
  }

  /**
   * New authority set has been applied.
   */
  get asV29(): {authoritySet: [v29.Public, bigint][]} {
    assert(this.isV29)
    return this._chain.decodeEvent(this.event)
  }
}

export class StakingBondedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Staking.Bonded')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  An account has bonded this amount. \[stash, amount\]
   * 
   *  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
   *  it will not be emitted for staking rewards when they are added to stake.
   */
  get isV13(): boolean {
    return this._chain.getEventHash('Staking.Bonded') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  An account has bonded this amount. \[stash, amount\]
   * 
   *  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
   *  it will not be emitted for staking rewards when they are added to stake.
   */
  get asV13(): [v13.AccountId, v13.Balance] {
    assert(this.isV13)
    return this._chain.decodeEvent(this.event)
  }
}

export class StakingEraPaidEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Staking.EraPaid')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * The era payout has been set; the first balance is the validator-payout; the second is
   * the remainder from the maximum amount of reward.
   * \[era_index, validator_payout, remainder\]
   */
  get isV29(): boolean {
    return this._chain.getEventHash('Staking.EraPaid') === '1b75f96f7f74feed246668e0244abf707060018d56d88b1a638f75594d2a8005'
  }

  /**
   * The era payout has been set; the first balance is the validator-payout; the second is
   * the remainder from the maximum amount of reward.
   * \[era_index, validator_payout, remainder\]
   */
  get asV29(): [number, bigint, bigint] {
    assert(this.isV29)
    return this._chain.decodeEvent(this.event)
  }
}

export class StakingPayoutStartedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Staking.PayoutStarted')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * The stakers' rewards are getting paid. \[era_index, validator_stash\]
   */
  get isV29(): boolean {
    return this._chain.getEventHash('Staking.PayoutStarted') === '0379562584d6426ccff49705dfa9dba95ad94215b772fd97d0ad0c4ca0001c12'
  }

  /**
   * The stakers' rewards are getting paid. \[era_index, validator_stash\]
   */
  get asV29(): [number, v29.AccountId32] {
    assert(this.isV29)
    return this._chain.decodeEvent(this.event)
  }
}

export class StakingRewardEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Staking.Reward')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  The staker has been rewarded by this amount. \[stash, amount\]
   */
  get isV13(): boolean {
    return this._chain.getEventHash('Staking.Reward') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  The staker has been rewarded by this amount. \[stash, amount\]
   */
  get asV13(): [v13.AccountId, v13.Balance] {
    assert(this.isV13)
    return this._chain.decodeEvent(this.event)
  }
}

export class StakingRewardedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Staking.Rewarded')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * The nominator has been rewarded by this amount. \[stash, amount\]
   */
  get isV29(): boolean {
    return this._chain.getEventHash('Staking.Rewarded') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   * The nominator has been rewarded by this amount. \[stash, amount\]
   */
  get asV29(): [v29.AccountId32, bigint] {
    assert(this.isV29)
    return this._chain.decodeEvent(this.event)
  }
}

export class StakingSlashEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Staking.Slash')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   *  \[validator, amount\]
   */
  get isV13(): boolean {
    return this._chain.getEventHash('Staking.Slash') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   *  \[validator, amount\]
   */
  get asV13(): [v13.AccountId, v13.Balance] {
    assert(this.isV13)
    return this._chain.decodeEvent(this.event)
  }
}

export class StakingSlashedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Staking.Slashed')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * One validator (and its nominators) has been slashed by the given amount.
   * \[validator, amount\]
   */
  get isV29(): boolean {
    return this._chain.getEventHash('Staking.Slashed') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   * One validator (and its nominators) has been slashed by the given amount.
   * \[validator, amount\]
   */
  get asV29(): [v29.AccountId32, bigint] {
    assert(this.isV29)
    return this._chain.decodeEvent(this.event)
  }
}

export class StakingUnbondedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Staking.Unbonded')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  An account has unbonded this amount. \[stash, amount\]
   */
  get isV13(): boolean {
    return this._chain.getEventHash('Staking.Unbonded') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  An account has unbonded this amount. \[stash, amount\]
   */
  get asV13(): [v13.AccountId, v13.Balance] {
    assert(this.isV13)
    return this._chain.decodeEvent(this.event)
  }
}

export class StakingWithdrawnEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Staking.Withdrawn')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
   *  from the unlocking queue. \[stash, amount\]
   */
  get isV13(): boolean {
    return this._chain.getEventHash('Staking.Withdrawn') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
   *  from the unlocking queue. \[stash, amount\]
   */
  get asV13(): [v13.AccountId, v13.Balance] {
    assert(this.isV13)
    return this._chain.decodeEvent(this.event)
  }
}
