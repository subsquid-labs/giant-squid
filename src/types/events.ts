import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'
import * as v4 from './v4'
import * as v12 from './v12'
import * as v17 from './v17'

export class DappsStakingBondAndStakeEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.BondAndStake')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Account has bonded and staked funds on a smart contract.
   */
  get isV4(): boolean {
    return this._chain.getEventHash('DappsStaking.BondAndStake') === '042590a56807e3351faf948dab2a22fe138af945cd9e46b379a3f568ede79c4d'
  }

  /**
   * Account has bonded and staked funds on a smart contract.
   */
  get asV4(): [Uint8Array, v4.SmartContract, bigint] {
    assert(this.isV4)
    return this._chain.decodeEvent(this.event)
  }
}

export class DappsStakingContractRemovedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.ContractRemoved')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Contract removed from dapps staking.
   */
  get isV4(): boolean {
    return this._chain.getEventHash('DappsStaking.ContractRemoved') === 'b4d757bb39450c2497cb2bbaad5596ee7e5cb1b1e04c09bdacd6714f76d1a214'
  }

  /**
   * Contract removed from dapps staking.
   */
  get asV4(): [Uint8Array, v4.SmartContract] {
    assert(this.isV4)
    return this._chain.decodeEvent(this.event)
  }
}

export class DappsStakingNewContractEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.NewContract')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * New contract added for staking.
   */
  get isV4(): boolean {
    return this._chain.getEventHash('DappsStaking.NewContract') === 'b4d757bb39450c2497cb2bbaad5596ee7e5cb1b1e04c09bdacd6714f76d1a214'
  }

  /**
   * New contract added for staking.
   */
  get asV4(): [Uint8Array, v4.SmartContract] {
    assert(this.isV4)
    return this._chain.decodeEvent(this.event)
  }
}

export class DappsStakingNewDappStakingEraEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.NewDappStakingEra')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * New dapps staking era. Distribute era rewards to contracts.
   */
  get isV4(): boolean {
    return this._chain.getEventHash('DappsStaking.NewDappStakingEra') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   * New dapps staking era. Distribute era rewards to contracts.
   */
  get asV4(): number {
    assert(this.isV4)
    return this._chain.decodeEvent(this.event)
  }
}

export class DappsStakingNominationTransferEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.NominationTransfer')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Nomination part has been transfered from one contract to another.
   * 
   * \(staker account, origin smart contract, amount, target smart contract\)
   */
  get isV17(): boolean {
    return this._chain.getEventHash('DappsStaking.NominationTransfer') === '4f17bfdd591d68aa34974d9299444b19ef6280de57f99b635a5179ef61aa5173'
  }

  /**
   * Nomination part has been transfered from one contract to another.
   * 
   * \(staker account, origin smart contract, amount, target smart contract\)
   */
  get asV17(): [Uint8Array, v17.SmartContract, bigint, v17.SmartContract] {
    assert(this.isV17)
    return this._chain.decodeEvent(this.event)
  }
}

export class DappsStakingRewardEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.Reward')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Reward paid to staker or developer.
   */
  get isV4(): boolean {
    return this._chain.getEventHash('DappsStaking.Reward') === '8893e04840c35675d9756bedd440cb2cf3490c1aaae0bd1f0204c2fbcab411c8'
  }

  /**
   * Reward paid to staker or developer.
   */
  get asV4(): [Uint8Array, v4.SmartContract, number, bigint] {
    assert(this.isV4)
    return this._chain.decodeEvent(this.event)
  }
}

export class DappsStakingUnbondAndUnstakeEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.UnbondAndUnstake')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Account has unbonded & unstaked some funds. Unbonding process begins.
   */
  get isV12(): boolean {
    return this._chain.getEventHash('DappsStaking.UnbondAndUnstake') === '042590a56807e3351faf948dab2a22fe138af945cd9e46b379a3f568ede79c4d'
  }

  /**
   * Account has unbonded & unstaked some funds. Unbonding process begins.
   */
  get asV12(): [Uint8Array, v12.SmartContract, bigint] {
    assert(this.isV12)
    return this._chain.decodeEvent(this.event)
  }
}

export class DappsStakingUnbondUnstakeAndWithdrawEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.UnbondUnstakeAndWithdraw')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Account has unbonded, unstaked and withdrawn funds.
   */
  get isV4(): boolean {
    return this._chain.getEventHash('DappsStaking.UnbondUnstakeAndWithdraw') === '042590a56807e3351faf948dab2a22fe138af945cd9e46b379a3f568ede79c4d'
  }

  /**
   * Account has unbonded, unstaked and withdrawn funds.
   */
  get asV4(): [Uint8Array, v4.SmartContract, bigint] {
    assert(this.isV4)
    return this._chain.decodeEvent(this.event)
  }
}

export class DappsStakingWithdrawFromUnregisteredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.WithdrawFromUnregistered')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Account has fully withdrawn all staked amount from an unregistered contract.
   */
  get isV12(): boolean {
    return this._chain.getEventHash('DappsStaking.WithdrawFromUnregistered') === '042590a56807e3351faf948dab2a22fe138af945cd9e46b379a3f568ede79c4d'
  }

  /**
   * Account has fully withdrawn all staked amount from an unregistered contract.
   */
  get asV12(): [Uint8Array, v12.SmartContract, bigint] {
    assert(this.isV12)
    return this._chain.decodeEvent(this.event)
  }
}

export class DappsStakingWithdrawnEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.Withdrawn')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Account has withdrawn unbonded funds.
   */
  get isV12(): boolean {
    return this._chain.getEventHash('DappsStaking.Withdrawn') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   * Account has withdrawn unbonded funds.
   */
  get asV12(): [Uint8Array, bigint] {
    assert(this.isV12)
    return this._chain.decodeEvent(this.event)
  }
}
