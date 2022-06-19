import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v9130 from './v9130'
import * as v9230 from './v9230'

export class BalancesTransferEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Transfer')
  }

  /**
   *  Transfer succeeded (from, to, value, fees).
   */
  get isV1020(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '72e6f0d399a72f77551d560f52df25d757e0643d0192b3bc837cbd91b6f36b27'
  }

  /**
   *  Transfer succeeded (from, to, value, fees).
   */
  get asV1020(): [Uint8Array, Uint8Array, bigint, bigint] {
    assert(this.isV1020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   *  Transfer succeeded (from, to, value).
   */
  get isV1050(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
  }

  /**
   *  Transfer succeeded (from, to, value).
   */
  get asV1050(): [Uint8Array, Uint8Array, bigint] {
    assert(this.isV1050)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
  }

  /**
   * Transfer succeeded.
   */
  get asV9130(): {from: v9130.AccountId32, to: v9130.AccountId32, amount: bigint} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {from: v9130.AccountId32, to: v9130.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9130
  }
}

export class CrowdloanContributedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'crowdloan.Contributed')
  }

  /**
   *  Contributed to a crowd sale. [who, fund_index, amount]
   */
  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('crowdloan.Contributed') === 'ad00729b31f26d2879a6f96c1691ed42a69cd4947c75e84221a6bde93a3415bc'
  }

  /**
   *  Contributed to a crowd sale. [who, fund_index, amount]
   */
  get asV9010(): [Uint8Array, number, bigint] {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Contributed to a crowd sale.
   */
  get isV9230(): boolean {
    return this.ctx._chain.getEventHash('crowdloan.Contributed') === 'a09bba4441a47a7b463e5f26020197386183019a6130ce697a434ee31cc39482'
  }

  /**
   * Contributed to a crowd sale.
   */
  get asV9230(): {who: v9230.AccountId32, fundIndex: v9230.Id, amount: bigint} {
    assert(this.isV9230)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9230
  }

  get asLatest(): {who: v9230.AccountId32, fundIndex: v9230.Id, amount: bigint} {
    deprecateLatest()
    return this.asV9230
  }
}

export class CrowdloanCreatedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'crowdloan.Created')
  }

  /**
   *  Create a new crowdloaning campaign. [fund_index]
   */
  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('crowdloan.Created') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   *  Create a new crowdloaning campaign. [fund_index]
   */
  get asV9010(): number {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Create a new crowdloaning campaign.
   */
  get isV9230(): boolean {
    return this.ctx._chain.getEventHash('crowdloan.Created') === 'de61486138d2b3b92b3ed0bdfddb05a4a7e6ae35d065c89bba1f47c365c252e2'
  }

  /**
   * Create a new crowdloaning campaign.
   */
  get asV9230(): {paraId: v9230.Id} {
    assert(this.isV9230)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9230
  }

  get asLatest(): {paraId: v9230.Id} {
    deprecateLatest()
    return this.asV9230
  }
}

export class CrowdloanDissolvedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'crowdloan.Dissolved')
  }

  /**
   *  Fund is dissolved. [fund_index]
   */
  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('crowdloan.Dissolved') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   *  Fund is dissolved. [fund_index]
   */
  get asV9010(): number {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Fund is dissolved.
   */
  get isV9230(): boolean {
    return this.ctx._chain.getEventHash('crowdloan.Dissolved') === 'de61486138d2b3b92b3ed0bdfddb05a4a7e6ae35d065c89bba1f47c365c252e2'
  }

  /**
   * Fund is dissolved.
   */
  get asV9230(): {paraId: v9230.Id} {
    assert(this.isV9230)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9230
  }

  get asLatest(): {paraId: v9230.Id} {
    deprecateLatest()
    return this.asV9230
  }
}

export class StakingBondedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Bonded')
  }

  /**
   *  An account has bonded this amount.
   * 
   *  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
   *  it will not be emitted for staking rewards when they are added to stake.
   */
  get isV1051(): boolean {
    return this.ctx._chain.getEventHash('staking.Bonded') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  An account has bonded this amount.
   * 
   *  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
   *  it will not be emitted for staking rewards when they are added to stake.
   */
  get asV1051(): [Uint8Array, bigint] {
    assert(this.isV1051)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1051
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV1051
  }
}

export class StakingEraPaidEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.EraPaid')
  }

  /**
   *  The era payout has been set; the first balance is the validator-payout; the second is
   *  the remainder from the maximum amount of reward.
   *  \[era_index, validator_payout, remainder\]
   */
  get isV9090(): boolean {
    return this.ctx._chain.getEventHash('staking.EraPaid') === '1b75f96f7f74feed246668e0244abf707060018d56d88b1a638f75594d2a8005'
  }

  /**
   *  The era payout has been set; the first balance is the validator-payout; the second is
   *  the remainder from the maximum amount of reward.
   *  \[era_index, validator_payout, remainder\]
   */
  get asV9090(): [number, bigint, bigint] {
    assert(this.isV9090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9090
  }

  get asLatest(): [number, bigint, bigint] {
    deprecateLatest()
    return this.asV9090
  }
}

export class StakingPayoutStartedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.PayoutStarted')
  }

  /**
   *  The stakers' rewards are getting paid. \[era_index, validator_stash\]
   */
  get isV9090(): boolean {
    return this.ctx._chain.getEventHash('staking.PayoutStarted') === '0379562584d6426ccff49705dfa9dba95ad94215b772fd97d0ad0c4ca0001c12'
  }

  /**
   *  The stakers' rewards are getting paid. \[era_index, validator_stash\]
   */
  get asV9090(): [number, Uint8Array] {
    assert(this.isV9090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9090
  }

  get asLatest(): [number, Uint8Array] {
    deprecateLatest()
    return this.asV9090
  }
}

export class StakingRewardEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Reward')
  }

  /**
   *  All validators have been rewarded by the first balance; the second is the remainder
   *  from the maximum amount of reward.
   */
  get isV1020(): boolean {
    return this.ctx._chain.getEventHash('staking.Reward') === 'f7d5bd1431cb954502149f64a8137986d660e0729a3d9731d421496b4298be52'
  }

  /**
   *  All validators have been rewarded by the first balance; the second is the remainder
   *  from the maximum amount of reward.
   */
  get asV1020(): [bigint, bigint] {
    assert(this.isV1020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   *  The staker has been rewarded by this amount. AccountId is controller account.
   */
  get isV1050(): boolean {
    return this.ctx._chain.getEventHash('staking.Reward') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  The staker has been rewarded by this amount. AccountId is controller account.
   */
  get asV1050(): [Uint8Array, bigint] {
    assert(this.isV1050)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1050
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV1050
  }
}

export class StakingRewardedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Rewarded')
  }

  /**
   *  The nominator has been rewarded by this amount. \[stash, amount\]
   */
  get isV9090(): boolean {
    return this.ctx._chain.getEventHash('staking.Rewarded') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  The nominator has been rewarded by this amount. \[stash, amount\]
   */
  get asV9090(): [Uint8Array, bigint] {
    assert(this.isV9090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9090
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV9090
  }
}

export class StakingSlashEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Slash')
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   */
  get isV1020(): boolean {
    return this.ctx._chain.getEventHash('staking.Slash') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   */
  get asV1020(): [Uint8Array, bigint] {
    assert(this.isV1020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1020
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV1020
  }
}

export class StakingSlashedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Slashed')
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   *  \[validator, amount\]
   */
  get isV9090(): boolean {
    return this.ctx._chain.getEventHash('staking.Slashed') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   *  \[validator, amount\]
   */
  get asV9090(): [Uint8Array, bigint] {
    assert(this.isV9090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9090
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV9090
  }
}

export class StakingUnbondedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Unbonded')
  }

  /**
   *  An account has unbonded this amount.
   */
  get isV1051(): boolean {
    return this.ctx._chain.getEventHash('staking.Unbonded') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  An account has unbonded this amount.
   */
  get asV1051(): [Uint8Array, bigint] {
    assert(this.isV1051)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1051
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV1051
  }
}

export class StakingWithdrawnEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Withdrawn')
  }

  /**
   *  An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
   *  from the unlocking queue.
   */
  get isV1051(): boolean {
    return this.ctx._chain.getEventHash('staking.Withdrawn') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
   *  from the unlocking queue.
   */
  get asV1051(): [Uint8Array, bigint] {
    assert(this.isV1051)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1051
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV1051
  }
}
