import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v1 from './v1'
import * as v3 from './v3'
import * as v4 from './v4'

export class BalancesTransferEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Transfer')
  }

  /**
   * Transfer succeeded. \[from, to, value\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
  }

  /**
   * Transfer succeeded. \[from, to, value\]
   */
  get asV1(): [v1.AccountId32, v1.AccountId32, bigint] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
  }

  /**
   * Transfer succeeded.
   */
  get asV3(): {from: v3.AccountId32, to: v3.AccountId32, amount: bigint} {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV3
  }

  get asLatest(): {from: v3.AccountId32, to: v3.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV3
  }
}

export class DappsStakingBondAndStakeEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'dappsStaking.BondAndStake')
  }

  /**
   * Account has bonded and staked funds on a smart contract.
   */
  get isV4(): boolean {
    return this.ctx._chain.getEventHash('dappsStaking.BondAndStake') === '042590a56807e3351faf948dab2a22fe138af945cd9e46b379a3f568ede79c4d'
  }

  /**
   * Account has bonded and staked funds on a smart contract.
   */
  get asV4(): [v4.AccountId32, v4.SmartContract, bigint] {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV4
  }

  get asLatest(): [v4.AccountId32, v4.SmartContract, bigint] {
    deprecateLatest()
    return this.asV4
  }
}

export class DappsStakingRewardEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'dappsStaking.Reward')
  }

  /**
   * Reward paid to staker or developer.
   */
  get isV4(): boolean {
    return this.ctx._chain.getEventHash('dappsStaking.Reward') === '8893e04840c35675d9756bedd440cb2cf3490c1aaae0bd1f0204c2fbcab411c8'
  }

  /**
   * Reward paid to staker or developer.
   */
  get asV4(): [v4.AccountId32, v4.SmartContract, number, bigint] {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV4
  }

  get asLatest(): [v4.AccountId32, v4.SmartContract, number, bigint] {
    deprecateLatest()
    return this.asV4
  }
}

export class DappsStakingUnbondUnstakeAndWithdrawEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'dappsStaking.UnbondUnstakeAndWithdraw')
  }

  /**
   * Account has unbonded, unstaked and withdrawn funds.
   */
  get isV4(): boolean {
    return this.ctx._chain.getEventHash('dappsStaking.UnbondUnstakeAndWithdraw') === '042590a56807e3351faf948dab2a22fe138af945cd9e46b379a3f568ede79c4d'
  }

  /**
   * Account has unbonded, unstaked and withdrawn funds.
   */
  get asV4(): [v4.AccountId32, v4.SmartContract, bigint] {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV4
  }

  get asLatest(): [v4.AccountId32, v4.SmartContract, bigint] {
    deprecateLatest()
    return this.asV4
  }
}
