import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v1 from './v1'
import * as v4 from './v4'

export class BalancesForceTransferCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'balances.forceTransfer' || this.ctx.extrinsic.name === 'balances.force_transfer')
  }

  /**
   * Exactly as `transfer`, except the origin must be root and the source account may be
   * specified.
   * # <weight>
   * - Same as transfer, but additional read and write because the source account is not
   *   assumed to be in the overlay.
   * # </weight>
   */
  get isV1(): boolean {
    return this.ctx._chain.getCallHash('balances.force_transfer') === 'e5944fbe8224a17fe49f9c1d1d01efaf87fb1778fd39618512af54c9ba6f9dff'
  }

  /**
   * Exactly as `transfer`, except the origin must be root and the source account may be
   * specified.
   * # <weight>
   * - Same as transfer, but additional read and write because the source account is not
   *   assumed to be in the overlay.
   * # </weight>
   */
  get asV1(): {source: v1.MultiAddress, dest: v1.MultiAddress, value: bigint} {
    assert(this.isV1)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1
  }

  get asLatest(): {source: v1.MultiAddress, dest: v1.MultiAddress, value: bigint} {
    deprecateLatest()
    return this.asV1
  }
}

export class BalancesTransferCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'balances.transfer')
  }

  /**
   * Transfer some liquid free balance to another account.
   * 
   * `transfer` will set the `FreeBalance` of the sender and receiver.
   * It will decrease the total issuance of the system by the `TransferFee`.
   * If the sender's account is below the existential deposit as a result
   * of the transfer, the account will be reaped.
   * 
   * The dispatch origin for this call must be `Signed` by the transactor.
   * 
   * # <weight>
   * - Dependent on arguments but not critical, given proper implementations for input config
   *   types. See related functions below.
   * - It contains a limited number of reads and writes internally and no complex
   *   computation.
   * 
   * Related functions:
   * 
   *   - `ensure_can_withdraw` is always called internally but has a bounded complexity.
   *   - Transferring balances to accounts that did not exist before will cause
   *     `T::OnNewAccount::on_new_account` to be called.
   *   - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
   *   - `transfer_keep_alive` works the same way as `transfer`, but has an additional check
   *     that the transfer will not kill the origin account.
   * ---------------------------------
   * - Base Weight: 73.64 µs, worst case scenario (account created, account removed)
   * - DB Weight: 1 Read and 1 Write to destination account
   * - Origin account is already in memory, so no DB operations for them.
   * # </weight>
   */
  get isV1(): boolean {
    return this.ctx._chain.getCallHash('balances.transfer') === 'fc85bea9d0d171982f66e8a55667d58dc9a1612bcafe84309942bf47e23e3094'
  }

  /**
   * Transfer some liquid free balance to another account.
   * 
   * `transfer` will set the `FreeBalance` of the sender and receiver.
   * It will decrease the total issuance of the system by the `TransferFee`.
   * If the sender's account is below the existential deposit as a result
   * of the transfer, the account will be reaped.
   * 
   * The dispatch origin for this call must be `Signed` by the transactor.
   * 
   * # <weight>
   * - Dependent on arguments but not critical, given proper implementations for input config
   *   types. See related functions below.
   * - It contains a limited number of reads and writes internally and no complex
   *   computation.
   * 
   * Related functions:
   * 
   *   - `ensure_can_withdraw` is always called internally but has a bounded complexity.
   *   - Transferring balances to accounts that did not exist before will cause
   *     `T::OnNewAccount::on_new_account` to be called.
   *   - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
   *   - `transfer_keep_alive` works the same way as `transfer`, but has an additional check
   *     that the transfer will not kill the origin account.
   * ---------------------------------
   * - Base Weight: 73.64 µs, worst case scenario (account created, account removed)
   * - DB Weight: 1 Read and 1 Write to destination account
   * - Origin account is already in memory, so no DB operations for them.
   * # </weight>
   */
  get asV1(): {dest: v1.MultiAddress, value: bigint} {
    assert(this.isV1)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1
  }

  get asLatest(): {dest: v1.MultiAddress, value: bigint} {
    deprecateLatest()
    return this.asV1
  }
}

export class BalancesTransferAllCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'balances.transferAll' || this.ctx.extrinsic.name === 'balances.transfer_all')
  }

  /**
   * Transfer the entire transferable balance from the caller account.
   * 
   * NOTE: This function only attempts to transfer _transferable_ balances. This means that
   * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
   * transferred by this function. To ensure that this function results in a killed account,
   * you might need to prepare the account by removing any reference counters, storage
   * deposits, etc...
   * 
   * The dispatch origin of this call must be Signed.
   * 
   * - `dest`: The recipient of the transfer.
   * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
   *   of the funds the account has, causing the sender account to be killed (false), or
   *   transfer everything except at least the existential deposit, which will guarantee to
   *   keep the sender account alive (true). # <weight>
   * - O(1). Just like transfer, but reading the user's transferable balance first.
   *   #</weight>
   */
  get isV1(): boolean {
    return this.ctx._chain.getCallHash('balances.transfer_all') === '9c94c2ca9979f6551af6e123fb6b6ba14d026f862f9a023706f8f88c556b355f'
  }

  /**
   * Transfer the entire transferable balance from the caller account.
   * 
   * NOTE: This function only attempts to transfer _transferable_ balances. This means that
   * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
   * transferred by this function. To ensure that this function results in a killed account,
   * you might need to prepare the account by removing any reference counters, storage
   * deposits, etc...
   * 
   * The dispatch origin of this call must be Signed.
   * 
   * - `dest`: The recipient of the transfer.
   * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
   *   of the funds the account has, causing the sender account to be killed (false), or
   *   transfer everything except at least the existential deposit, which will guarantee to
   *   keep the sender account alive (true). # <weight>
   * - O(1). Just like transfer, but reading the user's transferable balance first.
   *   #</weight>
   */
  get asV1(): {dest: v1.MultiAddress, keepAlive: boolean} {
    assert(this.isV1)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1
  }

  get asLatest(): {dest: v1.MultiAddress, keepAlive: boolean} {
    deprecateLatest()
    return this.asV1
  }
}

export class BalancesTransferKeepAliveCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'balances.transferKeepAlive' || this.ctx.extrinsic.name === 'balances.transfer_keep_alive')
  }

  /**
   * Same as the [`transfer`] call, but with a check that the transfer will not kill the
   * origin account.
   * 
   * 99% of the time you want [`transfer`] instead.
   * 
   * [`transfer`]: struct.Pallet.html#method.transfer
   * # <weight>
   * - Cheaper than transfer because account cannot be killed.
   * - Base Weight: 51.4 µs
   * - DB Weight: 1 Read and 1 Write to dest (sender is in overlay already)
   * #</weight>
   */
  get isV1(): boolean {
    return this.ctx._chain.getCallHash('balances.transfer_keep_alive') === 'fc85bea9d0d171982f66e8a55667d58dc9a1612bcafe84309942bf47e23e3094'
  }

  /**
   * Same as the [`transfer`] call, but with a check that the transfer will not kill the
   * origin account.
   * 
   * 99% of the time you want [`transfer`] instead.
   * 
   * [`transfer`]: struct.Pallet.html#method.transfer
   * # <weight>
   * - Cheaper than transfer because account cannot be killed.
   * - Base Weight: 51.4 µs
   * - DB Weight: 1 Read and 1 Write to dest (sender is in overlay already)
   * #</weight>
   */
  get asV1(): {dest: v1.MultiAddress, value: bigint} {
    assert(this.isV1)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1
  }

  get asLatest(): {dest: v1.MultiAddress, value: bigint} {
    deprecateLatest()
    return this.asV1
  }
}

export class DappsStakingBondAndStakeCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'dappsStaking.bondAndStake' || this.ctx.extrinsic.name === 'dappsStaking.bond_and_stake')
  }

  /**
   * Lock up and stake balance of the origin account.
   * 
   * `value` must be more than the `minimum_balance` specified by `T::Currency`
   * unless account already has bonded value equal or more than 'minimum_balance'.
   * 
   * The dispatch origin for this call must be _Signed_ by the staker's account.
   * 
   * Effects of staking will be felt at the beginning of the next era.
   * 
   */
  get isV4(): boolean {
    return this.ctx._chain.getCallHash('dappsStaking.bond_and_stake') === '6672ecd9402312c35802b77f170edc72a7da0d94f1eba35efb11822174eb6435'
  }

  /**
   * Lock up and stake balance of the origin account.
   * 
   * `value` must be more than the `minimum_balance` specified by `T::Currency`
   * unless account already has bonded value equal or more than 'minimum_balance'.
   * 
   * The dispatch origin for this call must be _Signed_ by the staker's account.
   * 
   * Effects of staking will be felt at the beginning of the next era.
   * 
   */
  get asV4(): {contractId: v4.SmartContract, value: bigint} {
    assert(this.isV4)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV4
  }

  get asLatest(): {contractId: v4.SmartContract, value: bigint} {
    deprecateLatest()
    return this.asV4
  }
}

export class DappsStakingUnbondUnstakeAndWithdrawCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'dappsStaking.unbondUnstakeAndWithdraw' || this.ctx.extrinsic.name === 'dappsStaking.unbond_unstake_and_withdraw')
  }

  /**
   * Unbond, unstake and withdraw balance from the contract.
   * 
   * Value will be unlocked for the user.
   * 
   * In case remaining staked balance on contract is below minimum staking amount,
   * entire stake for that contract will be unstaked.
   * 
   */
  get isV4(): boolean {
    return this.ctx._chain.getCallHash('dappsStaking.unbond_unstake_and_withdraw') === '6672ecd9402312c35802b77f170edc72a7da0d94f1eba35efb11822174eb6435'
  }

  /**
   * Unbond, unstake and withdraw balance from the contract.
   * 
   * Value will be unlocked for the user.
   * 
   * In case remaining staked balance on contract is below minimum staking amount,
   * entire stake for that contract will be unstaked.
   * 
   */
  get asV4(): {contractId: v4.SmartContract, value: bigint} {
    assert(this.isV4)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV4
  }

  get asLatest(): {contractId: v4.SmartContract, value: bigint} {
    deprecateLatest()
    return this.asV4
  }
}
