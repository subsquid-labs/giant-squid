import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v17 from './v17'
import * as v22 from './v22'
import * as v36 from './v36'

export class BalancesTransferEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Transfer')
  }

  /**
   *  Transfer succeeded. \[from, to, value\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
  }

  /**
   *  Transfer succeeded. \[from, to, value\]
   */
  get asV1(): [Uint8Array, Uint8Array, bigint] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV36(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
  }

  /**
   * Transfer succeeded.
   */
  get asV36(): {from: v36.AccountId32, to: v36.AccountId32, amount: bigint} {
    assert(this.isV36)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV36
  }

  get asLatest(): {from: v36.AccountId32, to: v36.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV36
  }
}

export class DappsStakingBondAndStakeEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'dappsStaking.BondAndStake')
  }

  /**
   *  Account has bonded and staked funds on a smart contract.
   */
  get isV17(): boolean {
    return this.ctx._chain.getEventHash('dappsStaking.BondAndStake') === '042590a56807e3351faf948dab2a22fe138af945cd9e46b379a3f568ede79c4d'
  }

  /**
   *  Account has bonded and staked funds on a smart contract.
   */
  get asV17(): [Uint8Array, v17.SmartContract, bigint] {
    assert(this.isV17)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV17
  }

  get asLatest(): [Uint8Array, v17.SmartContract, bigint] {
    deprecateLatest()
    return this.asV17
  }
}

export class DappsStakingRewardEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'dappsStaking.Reward')
  }

  /**
   *  Reward paid to staker or developer.
   */
  get isV22(): boolean {
    return this.ctx._chain.getEventHash('dappsStaking.Reward') === '8893e04840c35675d9756bedd440cb2cf3490c1aaae0bd1f0204c2fbcab411c8'
  }

  /**
   *  Reward paid to staker or developer.
   */
  get asV22(): [Uint8Array, v22.SmartContract, number, bigint] {
    assert(this.isV22)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV22
  }

  get asLatest(): [Uint8Array, v22.SmartContract, number, bigint] {
    deprecateLatest()
    return this.asV22
  }
}

export class DappsStakingUnbondUnstakeAndWithdrawEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'dappsStaking.UnbondUnstakeAndWithdraw')
  }

  /**
   *  Account has unbonded, unstaked and withdrawn funds.
   */
  get isV17(): boolean {
    return this.ctx._chain.getEventHash('dappsStaking.UnbondUnstakeAndWithdraw') === '042590a56807e3351faf948dab2a22fe138af945cd9e46b379a3f568ede79c4d'
  }

  /**
   *  Account has unbonded, unstaked and withdrawn funds.
   */
  get asV17(): [Uint8Array, v17.SmartContract, bigint] {
    assert(this.isV17)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV17
  }

  get asLatest(): [Uint8Array, v17.SmartContract, bigint] {
    deprecateLatest()
    return this.asV17
  }
}
