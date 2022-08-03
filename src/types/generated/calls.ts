import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v0 from './v0'
import * as v10 from './v10'
import * as v11 from './v11'
import * as v13 from './v13'
import * as v14 from './v14'
import * as v15 from './v15'
import * as v17 from './v17'
import * as v18 from './v18'
import * as v23 from './v23'
import * as v24 from './v24'
import * as v25 from './v25'
import * as v26 from './v26'
import * as v28 from './v28'
import * as v29 from './v29'
import * as v30 from './v30'
import * as v5 from './v5'
import * as v6 from './v6'
import * as v7 from './v7'
import * as v9 from './v9'
import * as v9050 from './v9050'
import * as v9080 from './v9080'
import * as v9090 from './v9090'
import * as v9100 from './v9100'
import * as v9110 from './v9110'
import * as v9140 from './v9140'
import * as v9170 from './v9170'
import * as v9180 from './v9180'
import * as v9190 from './v9190'
import * as v9220 from './v9220'
import * as v9230 from './v9230'
import * as v9250 from './v9250'

export class BalancesForceTransferCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'balances.forceTransfer' || this.ctx.extrinsic.name === 'balances.force_transfer')
  }

  /**
   *  Exactly as `transfer`, except the origin must be root and the source account may be
   *  specified.
   *  # <weight>
   *  - Same as transfer, but additional read and write because the source account is
   *    not assumed to be in the overlay.
   *  # </weight>
   */
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('balances.force_transfer') === '2fe8348cf811b833de74f02f6eeab668dbfad8a5d53274dd89837666ed3eb6fe'
  }

  /**
   *  Exactly as `transfer`, except the origin must be root and the source account may be
   *  specified.
   *  # <weight>
   *  - Same as transfer, but additional read and write because the source account is
   *    not assumed to be in the overlay.
   *  # </weight>
   */
  get asV0(): {source: Uint8Array, dest: Uint8Array, value: bigint} {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Exactly as `transfer`, except the origin must be root and the source account may be
   *  specified.
   *  # <weight>
   *  - Same as transfer, but additional read and write because the source account is
   *    not assumed to be in the overlay.
   *  # </weight>
   */
  get isV28(): boolean {
    return this.ctx._chain.getCallHash('balances.force_transfer') === '906df11f4f65ebd03a2b87ba248e1fba11c3a0bca42c892bee828bac3ec80348'
  }

  /**
   *  Exactly as `transfer`, except the origin must be root and the source account may be
   *  specified.
   *  # <weight>
   *  - Same as transfer, but additional read and write because the source account is
   *    not assumed to be in the overlay.
   *  # </weight>
   */
  get asV28(): {source: v28.GenericMultiAddress, dest: v28.GenericMultiAddress, value: bigint} {
    assert(this.isV28)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Exactly as `transfer`, except the origin must be root and the source account may be
   * specified.
   * # <weight>
   * - Same as transfer, but additional read and write because the source account is not
   *   assumed to be in the overlay.
   * # </weight>
   */
  get isV9110(): boolean {
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
  get asV9110(): {source: v9110.MultiAddress, dest: v9110.MultiAddress, value: bigint} {
    assert(this.isV9110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9110
  }

  get asLatest(): {source: v9110.MultiAddress, dest: v9110.MultiAddress, value: bigint} {
    deprecateLatest()
    return this.asV9110
  }
}

export class BalancesTransferCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'balances.transfer')
  }

  /**
   *  Transfer some liquid free balance to another account.
   * 
   *  `transfer` will set the `FreeBalance` of the sender and receiver.
   *  It will decrease the total issuance of the system by the `TransferFee`.
   *  If the sender's account is below the existential deposit as a result
   *  of the transfer, the account will be reaped.
   * 
   *  The dispatch origin for this call must be `Signed` by the transactor.
   * 
   *  # <weight>
   *  - Dependent on arguments but not critical, given proper implementations for
   *    input config types. See related functions below.
   *  - It contains a limited number of reads and writes internally and no complex computation.
   * 
   *  Related functions:
   * 
   *    - `ensure_can_withdraw` is always called internally but has a bounded complexity.
   *    - Transferring balances to accounts that did not exist before will cause
   *       `T::OnNewAccount::on_new_account` to be called.
   *    - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
   *    - `transfer_keep_alive` works the same way as `transfer`, but has an additional
   *      check that the transfer will not kill the origin account.
   *  ---------------------------------
   *  - Base Weight: 73.64 µs, worst case scenario (account created, account removed)
   *  - DB Weight: 1 Read and 1 Write to destination account
   *  - Origin account is already in memory, so no DB operations for them.
   *  # </weight>
   */
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('balances.transfer') === 'cf5bb376709277883598390b3462e93b0f3c383df391c0649728c965e8da82fd'
  }

  /**
   *  Transfer some liquid free balance to another account.
   * 
   *  `transfer` will set the `FreeBalance` of the sender and receiver.
   *  It will decrease the total issuance of the system by the `TransferFee`.
   *  If the sender's account is below the existential deposit as a result
   *  of the transfer, the account will be reaped.
   * 
   *  The dispatch origin for this call must be `Signed` by the transactor.
   * 
   *  # <weight>
   *  - Dependent on arguments but not critical, given proper implementations for
   *    input config types. See related functions below.
   *  - It contains a limited number of reads and writes internally and no complex computation.
   * 
   *  Related functions:
   * 
   *    - `ensure_can_withdraw` is always called internally but has a bounded complexity.
   *    - Transferring balances to accounts that did not exist before will cause
   *       `T::OnNewAccount::on_new_account` to be called.
   *    - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
   *    - `transfer_keep_alive` works the same way as `transfer`, but has an additional
   *      check that the transfer will not kill the origin account.
   *  ---------------------------------
   *  - Base Weight: 73.64 µs, worst case scenario (account created, account removed)
   *  - DB Weight: 1 Read and 1 Write to destination account
   *  - Origin account is already in memory, so no DB operations for them.
   *  # </weight>
   */
  get asV0(): {dest: Uint8Array, value: bigint} {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Transfer some liquid free balance to another account.
   * 
   *  `transfer` will set the `FreeBalance` of the sender and receiver.
   *  It will decrease the total issuance of the system by the `TransferFee`.
   *  If the sender's account is below the existential deposit as a result
   *  of the transfer, the account will be reaped.
   * 
   *  The dispatch origin for this call must be `Signed` by the transactor.
   * 
   *  # <weight>
   *  - Dependent on arguments but not critical, given proper implementations for
   *    input config types. See related functions below.
   *  - It contains a limited number of reads and writes internally and no complex computation.
   * 
   *  Related functions:
   * 
   *    - `ensure_can_withdraw` is always called internally but has a bounded complexity.
   *    - Transferring balances to accounts that did not exist before will cause
   *       `T::OnNewAccount::on_new_account` to be called.
   *    - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
   *    - `transfer_keep_alive` works the same way as `transfer`, but has an additional
   *      check that the transfer will not kill the origin account.
   *  ---------------------------------
   *  - Base Weight: 73.64 µs, worst case scenario (account created, account removed)
   *  - DB Weight: 1 Read and 1 Write to destination account
   *  - Origin account is already in memory, so no DB operations for them.
   *  # </weight>
   */
  get isV28(): boolean {
    return this.ctx._chain.getCallHash('balances.transfer') === 'c3f0f475940fc4bef49b298f76ba345680f20fc48d5899b4678314a07e2ce090'
  }

  /**
   *  Transfer some liquid free balance to another account.
   * 
   *  `transfer` will set the `FreeBalance` of the sender and receiver.
   *  It will decrease the total issuance of the system by the `TransferFee`.
   *  If the sender's account is below the existential deposit as a result
   *  of the transfer, the account will be reaped.
   * 
   *  The dispatch origin for this call must be `Signed` by the transactor.
   * 
   *  # <weight>
   *  - Dependent on arguments but not critical, given proper implementations for
   *    input config types. See related functions below.
   *  - It contains a limited number of reads and writes internally and no complex computation.
   * 
   *  Related functions:
   * 
   *    - `ensure_can_withdraw` is always called internally but has a bounded complexity.
   *    - Transferring balances to accounts that did not exist before will cause
   *       `T::OnNewAccount::on_new_account` to be called.
   *    - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
   *    - `transfer_keep_alive` works the same way as `transfer`, but has an additional
   *      check that the transfer will not kill the origin account.
   *  ---------------------------------
   *  - Base Weight: 73.64 µs, worst case scenario (account created, account removed)
   *  - DB Weight: 1 Read and 1 Write to destination account
   *  - Origin account is already in memory, so no DB operations for them.
   *  # </weight>
   */
  get asV28(): {dest: v28.GenericMultiAddress, value: bigint} {
    assert(this.isV28)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
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
  get isV9110(): boolean {
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
  get asV9110(): {dest: v9110.MultiAddress, value: bigint} {
    assert(this.isV9110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9110
  }

  get asLatest(): {dest: v9110.MultiAddress, value: bigint} {
    deprecateLatest()
    return this.asV9110
  }
}

export class BalancesTransferAllCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'balances.transferAll' || this.ctx.extrinsic.name === 'balances.transfer_all')
  }

  /**
   *  Transfer the entire transferable balance from the caller account.
   * 
   *  NOTE: This function only attempts to transfer _transferable_ balances. This means that
   *  any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
   *  transferred by this function. To ensure that this function results in a killed account,
   *  you might need to prepare the account by removing any reference counters, storage
   *  deposits, etc...
   * 
   *  The dispatch origin of this call must be Signed.
   * 
   *  - `dest`: The recipient of the transfer.
   *  - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
   *    of the funds the account has, causing the sender account to be killed (false), or
   *    transfer everything except at least the existential deposit, which will guarantee to
   *    keep the sender account alive (true).
   *    # <weight>
   *  - O(1). Just like transfer, but reading the user's transferable balance first.
   *    #</weight>
   */
  get isV9050(): boolean {
    return this.ctx._chain.getCallHash('balances.transfer_all') === '56952003e07947f758a9928d8462037abffea6a7fa991c0d3451f5c47d45f254'
  }

  /**
   *  Transfer the entire transferable balance from the caller account.
   * 
   *  NOTE: This function only attempts to transfer _transferable_ balances. This means that
   *  any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
   *  transferred by this function. To ensure that this function results in a killed account,
   *  you might need to prepare the account by removing any reference counters, storage
   *  deposits, etc...
   * 
   *  The dispatch origin of this call must be Signed.
   * 
   *  - `dest`: The recipient of the transfer.
   *  - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
   *    of the funds the account has, causing the sender account to be killed (false), or
   *    transfer everything except at least the existential deposit, which will guarantee to
   *    keep the sender account alive (true).
   *    # <weight>
   *  - O(1). Just like transfer, but reading the user's transferable balance first.
   *    #</weight>
   */
  get asV9050(): {dest: v9050.GenericMultiAddress, keepAlive: boolean} {
    assert(this.isV9050)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
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
  get isV9110(): boolean {
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
  get asV9110(): {dest: v9110.MultiAddress, keepAlive: boolean} {
    assert(this.isV9110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9110
  }

  get asLatest(): {dest: v9110.MultiAddress, keepAlive: boolean} {
    deprecateLatest()
    return this.asV9110
  }
}

export class BalancesTransferKeepAliveCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'balances.transferKeepAlive' || this.ctx.extrinsic.name === 'balances.transfer_keep_alive')
  }

  /**
   *  Same as the [`transfer`] call, but with a check that the transfer will not kill the
   *  origin account.
   * 
   *  99% of the time you want [`transfer`] instead.
   * 
   *  [`transfer`]: struct.Module.html#method.transfer
   *  # <weight>
   *  - Cheaper than transfer because account cannot be killed.
   *  - Base Weight: 51.4 µs
   *  - DB Weight: 1 Read and 1 Write to dest (sender is in overlay already)
   *  #</weight>
   */
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('balances.transfer_keep_alive') === 'cf5bb376709277883598390b3462e93b0f3c383df391c0649728c965e8da82fd'
  }

  /**
   *  Same as the [`transfer`] call, but with a check that the transfer will not kill the
   *  origin account.
   * 
   *  99% of the time you want [`transfer`] instead.
   * 
   *  [`transfer`]: struct.Module.html#method.transfer
   *  # <weight>
   *  - Cheaper than transfer because account cannot be killed.
   *  - Base Weight: 51.4 µs
   *  - DB Weight: 1 Read and 1 Write to dest (sender is in overlay already)
   *  #</weight>
   */
  get asV0(): {dest: Uint8Array, value: bigint} {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Same as the [`transfer`] call, but with a check that the transfer will not kill the
   *  origin account.
   * 
   *  99% of the time you want [`transfer`] instead.
   * 
   *  [`transfer`]: struct.Module.html#method.transfer
   *  # <weight>
   *  - Cheaper than transfer because account cannot be killed.
   *  - Base Weight: 51.4 µs
   *  - DB Weight: 1 Read and 1 Write to dest (sender is in overlay already)
   *  #</weight>
   */
  get isV28(): boolean {
    return this.ctx._chain.getCallHash('balances.transfer_keep_alive') === 'c3f0f475940fc4bef49b298f76ba345680f20fc48d5899b4678314a07e2ce090'
  }

  /**
   *  Same as the [`transfer`] call, but with a check that the transfer will not kill the
   *  origin account.
   * 
   *  99% of the time you want [`transfer`] instead.
   * 
   *  [`transfer`]: struct.Module.html#method.transfer
   *  # <weight>
   *  - Cheaper than transfer because account cannot be killed.
   *  - Base Weight: 51.4 µs
   *  - DB Weight: 1 Read and 1 Write to dest (sender is in overlay already)
   *  #</weight>
   */
  get asV28(): {dest: v28.GenericMultiAddress, value: bigint} {
    assert(this.isV28)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
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
  get isV9110(): boolean {
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
  get asV9110(): {dest: v9110.MultiAddress, value: bigint} {
    assert(this.isV9110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9110
  }

  get asLatest(): {dest: v9110.MultiAddress, value: bigint} {
    deprecateLatest()
    return this.asV9110
  }
}

export class CrowdloanContributeCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'crowdloan.contribute')
  }

  /**
   * Contribute to a crowd sale. This will transfer some balance over to fund a parachain
   * slot. It will be withdrawable when the crowdloan has ended and the funds are unused.
   */
  get isV9110(): boolean {
    return this.ctx._chain.getCallHash('crowdloan.contribute') === 'c85a49d78a97667f6d8d7cdda206ad3ba38bd873ab2e82a42135a31c48152a6c'
  }

  /**
   * Contribute to a crowd sale. This will transfer some balance over to fund a parachain
   * slot. It will be withdrawable when the crowdloan has ended and the funds are unused.
   */
  get asV9110(): {index: number, value: bigint, signature: (v9110.MultiSignature | undefined)} {
    assert(this.isV9110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9110
  }

  get asLatest(): {index: number, value: bigint, signature: (v9110.MultiSignature | undefined)} {
    deprecateLatest()
    return this.asV9110
  }
}

export class CrowdloanCreateCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'crowdloan.create')
  }

  /**
   * Create a new crowdloaning campaign for a parachain slot with the given lease period range.
   * 
   * This applies a lock to your parachain configuration, ensuring that it cannot be changed
   * by the parachain manager.
   */
  get isV9110(): boolean {
    return this.ctx._chain.getCallHash('crowdloan.create') === '9d0529ac9fb92b6a7eca157299243acd0d2eb82a352509475556c79f78f47aa3'
  }

  /**
   * Create a new crowdloaning campaign for a parachain slot with the given lease period range.
   * 
   * This applies a lock to your parachain configuration, ensuring that it cannot be changed
   * by the parachain manager.
   */
  get asV9110(): {index: number, cap: bigint, firstPeriod: number, lastPeriod: number, end: number, verifier: (v9110.MultiSigner | undefined)} {
    assert(this.isV9110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9110
  }

  get asLatest(): {index: number, cap: bigint, firstPeriod: number, lastPeriod: number, end: number, verifier: (v9110.MultiSigner | undefined)} {
    deprecateLatest()
    return this.asV9110
  }
}

export class MultisigAsMultiCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'multisig.asMulti' || this.ctx.extrinsic.name === 'multisig.as_multi')
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call. Calls must each fulfil the `IsCallable`
   *  filter.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create: 46.55 + 0.089 * S µs
   *      - Approve: 34.03 + .112 * S µs
   *      - Complete: 40.36 + .225 * S µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account]
   *      - Writes: Multisig Storage, [Caller Account]
   *  - Plus Call Weight
   *  # </weight>
   */
  get isV5(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === '46a043f1ec444058539dbc2011789df5c2cc0c5637a1c3e86cc9b63c213935f4'
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call. Calls must each fulfil the `IsCallable`
   *  filter.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create: 46.55 + 0.089 * S µs
   *      - Approve: 34.03 + .112 * S µs
   *      - Complete: 40.36 + .225 * S µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account]
   *      - Writes: Multisig Storage, [Caller Account]
   *  - Plus Call Weight
   *  # </weight>
   */
  get asV5(): {threshold: number, otherSignatories: Uint8Array[], maybeTimepoint: (v5.Timepoint | undefined), call: v5.Type_21} {
    assert(this.isV5)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call. Calls must each fulfil the `IsCallable`
   *  filter.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create: 46.55 + 0.089 * S µs
   *      - Approve: 34.03 + .112 * S µs
   *      - Complete: 40.36 + .225 * S µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account]
   *      - Writes: Multisig Storage, [Caller Account]
   *  - Plus Call Weight
   *  # </weight>
   */
  get isV6(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === 'bd04664208cd583c624cb259563d8814daee58bf2714bbc62db6f69da050b981'
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call. Calls must each fulfil the `IsCallable`
   *  filter.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create: 46.55 + 0.089 * S µs
   *      - Approve: 34.03 + .112 * S µs
   *      - Complete: 40.36 + .225 * S µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account]
   *      - Writes: Multisig Storage, [Caller Account]
   *  - Plus Call Weight
   *  # </weight>
   */
  get asV6(): {threshold: number, otherSignatories: Uint8Array[], maybeTimepoint: (v6.Timepoint | undefined), call: v6.Type_21} {
    assert(this.isV6)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call. Calls must each fulfil the `IsCallable`
   *  filter.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create: 46.55 + 0.089 * S µs
   *      - Approve: 34.03 + .112 * S µs
   *      - Complete: 40.36 + .225 * S µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account]
   *      - Writes: Multisig Storage, [Caller Account]
   *  - Plus Call Weight
   *  # </weight>
   */
  get isV7(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === '622cc5f286865cd6a3fc90a093f192e479e3562374df2aa0698d0b6de39cda7b'
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call. Calls must each fulfil the `IsCallable`
   *  filter.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create: 46.55 + 0.089 * S µs
   *      - Approve: 34.03 + .112 * S µs
   *      - Complete: 40.36 + .225 * S µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account]
   *      - Writes: Multisig Storage, [Caller Account]
   *  - Plus Call Weight
   *  # </weight>
   */
  get asV7(): {threshold: number, otherSignatories: Uint8Array[], maybeTimepoint: (v7.Timepoint | undefined), call: v7.Type_21} {
    assert(this.isV7)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create: 46.55 + 0.089 * S µs
   *      - Approve: 34.03 + .112 * S µs
   *      - Complete: 40.36 + .225 * S µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account]
   *      - Writes: Multisig Storage, [Caller Account]
   *  - Plus Call Weight
   *  # </weight>
   */
  get isV9(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === 'e8838182eb598fe94b4b42c3d17dc4c6df779a4e6e19f1e6023ac4b1f088d14b'
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create: 46.55 + 0.089 * S µs
   *      - Approve: 34.03 + .112 * S µs
   *      - Complete: 40.36 + .225 * S µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account]
   *      - Writes: Multisig Storage, [Caller Account]
   *  - Plus Call Weight
   *  # </weight>
   */
  get asV9(): {threshold: number, otherSignatories: Uint8Array[], maybeTimepoint: (v9.Timepoint | undefined), call: v9.Type_21} {
    assert(this.isV9)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create:          41.89 + 0.118 * S + .002 * Z µs
   *      - Create w/ Store: 53.57 + 0.119 * S + .003 * Z µs
   *      - Approve:         31.39 + 0.136 * S + .002 * Z µs
   *      - Complete:        39.94 + 0.26  * S + .002 * Z µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *      - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *  - Plus Call Weight
   *  # </weight>
   */
  get isV10(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === '548dea53ff79fe99438cf591950a533c93f9772d03a3995ec72a80376fcae222'
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create:          41.89 + 0.118 * S + .002 * Z µs
   *      - Create w/ Store: 53.57 + 0.119 * S + .003 * Z µs
   *      - Approve:         31.39 + 0.136 * S + .002 * Z µs
   *      - Complete:        39.94 + 0.26  * S + .002 * Z µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *      - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *  - Plus Call Weight
   *  # </weight>
   */
  get asV10(): {threshold: number, otherSignatories: Uint8Array[], maybeTimepoint: (v10.Timepoint | undefined), call: Uint8Array, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV10)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get isV9140(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === '82a8ce453a724ebb4bed43494ef68355c74db6b50677475d218208c684bba5f9'
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get asV9140(): {threshold: number, otherSignatories: v9140.AccountId32[], maybeTimepoint: (v9140.Timepoint | undefined), call: v9140.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV9140)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get isV9170(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === '411e02a2f127b35ed79d4b66e58b64f4c578dae1b00a6b752838611191cd0f07'
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get asV9170(): {threshold: number, otherSignatories: v9170.AccountId32[], maybeTimepoint: (v9170.Timepoint | undefined), call: v9170.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV9170)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get isV9180(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === 'a4a252ef7e0097d5a4df5ce4f9d588973f078826359c56e676cfd8ca76731188'
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get asV9180(): {threshold: number, otherSignatories: v9180.AccountId32[], maybeTimepoint: (v9180.Timepoint | undefined), call: v9180.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV9180)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get isV9190(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === 'a35d8fa4f8171905aeff5239e28a0b099d4eaad44af6bc9aea96416f3e0e46fa'
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get asV9190(): {threshold: number, otherSignatories: v9190.AccountId32[], maybeTimepoint: (v9190.Timepoint | undefined), call: v9190.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV9190)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get isV9220(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === '2a6773fd04d00a83c862894908f5dc0c7b2ce28a0f0523eda3a54ce51271acac'
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get asV9220(): {threshold: number, otherSignatories: v9220.AccountId32[], maybeTimepoint: (v9220.Timepoint | undefined), call: v9220.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV9220)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get isV9230(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === '175ef72522a9a21b9474529fff45b33c11b09deec90ccbf844ec61bf3a6f22a0'
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get asV9230(): {threshold: number, otherSignatories: v9230.AccountId32[], maybeTimepoint: (v9230.Timepoint | undefined), call: v9230.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV9230)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get isV9250(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === '6bf921e141cc0e63cdf35fa1b49c0e3b1cd6d7bbc6d8fb4165dc9da2ed3a0a2f'
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get asV9250(): {threshold: number, otherSignatories: v9250.AccountId32[], maybeTimepoint: (v9250.Timepoint | undefined), call: v9250.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV9250)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9250
  }

  get asLatest(): {threshold: number, otherSignatories: v9250.AccountId32[], maybeTimepoint: (v9250.Timepoint | undefined), call: v9250.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    deprecateLatest()
    return this.asV9250
  }
}

export class ProxyProxyCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'proxy.proxy')
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get isV5(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '1d2a476bdba02d2629d12ad6b4498f4a1d033c586a9ed1ee8f19b6aaa1d8cdf1'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get asV5(): {real: Uint8Array, forceProxyType: (v5.ProxyType | undefined), call: v5.Type_21} {
    assert(this.isV5)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get isV6(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'e670ee2fe4dd9abdb57acc382b9765b1f42cb1224c137eb8e8d491475e3e9ec9'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get asV6(): {real: Uint8Array, forceProxyType: (v6.ProxyType | undefined), call: v6.Type_21} {
    assert(this.isV6)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get isV7(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '6290fe4241c10748618ff4e27c04c1c27021f2773aa015543546512175968fb4'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get asV7(): {real: Uint8Array, forceProxyType: (v7.ProxyType | undefined), call: v7.Type_21} {
    assert(this.isV7)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get isV9(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '30d9950407372f52fd3b5701daed0ce7aec6d915b21bab385cfbd88b52a2de7a'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get asV9(): {real: Uint8Array, forceProxyType: (v9.ProxyType | undefined), call: v9.Type_21} {
    assert(this.isV9)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get isV10(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '7cd19ad9cfb5bbff0499d2effff0ed2ed8d882dfd07dc93d79cc242a76b0748a'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get asV10(): {real: Uint8Array, forceProxyType: (v10.ProxyType | undefined), call: v10.Type_21} {
    assert(this.isV10)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get isV11(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '27b1cd0d8fd81b99d967e35401eeff8092a6c0d8e9526971355e239e1d992312'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get asV11(): {real: Uint8Array, forceProxyType: (v11.ProxyType | undefined), call: v11.Type_21} {
    assert(this.isV11)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get isV13(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '2bc7c217a7e1509fc25f74923c2e995d4f7f88781922cf8b35314ed3cef0bd12'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get asV13(): {real: Uint8Array, forceProxyType: (v13.ProxyType | undefined), call: v13.Type_21} {
    assert(this.isV13)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get isV14(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '0f2fc33108fb719255d31655283300ba7c6086a784034add008928b4c0dabe6a'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get asV14(): {real: Uint8Array, forceProxyType: (v14.ProxyType | undefined), call: v14.Type_21} {
    assert(this.isV14)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get isV15(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '23b203f9174a26230102dd46bf43b1ebdca0e044c7afdbf9abff7b2c2538c6e8'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get asV15(): {real: Uint8Array, forceProxyType: (v15.ProxyType | undefined), call: v15.Type_21} {
    assert(this.isV15)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get isV17(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'b06812b120e473fcd12aa8d481ef9f51d30bb560cddf4b9915738e051d16a486'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get asV17(): {real: Uint8Array, forceProxyType: (v17.ProxyType | undefined), call: v17.Type_21} {
    assert(this.isV17)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get isV18(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '6b688f50a67560b5ba763873365f6545d41e9746033e7b8f41a9f3b302cdfe37'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  P is the number of proxies the user has
   *  - Base weight: 19.87 + .141 * P µs
   *  - DB weight: 1 storage read.
   *  - Plus the weight of the `call`
   *  # </weight>
   */
  get asV18(): {real: Uint8Array, forceProxyType: (v18.ProxyType | undefined), call: v18.Type_21} {
    assert(this.isV18)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get isV23(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'f4a61a3fd0fc94ef2aa0f265fa00576f9b25a4902cfc1f5129414e70ac2becd1'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get asV23(): {real: Uint8Array, forceProxyType: (v23.ProxyType | undefined), call: v23.Type_21} {
    assert(this.isV23)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get isV24(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '058d5ff95352baafb7d6319d4977501dde9972ae7abbe150212fd84d356186c8'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get asV24(): {real: Uint8Array, forceProxyType: (v24.ProxyType | undefined), call: v24.Type_21} {
    assert(this.isV24)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get isV25(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'ed40359aefe1341348c47410ab9fcb152ca2efcd37b6f090086b62b685137a7f'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get asV25(): {real: Uint8Array, forceProxyType: (v25.ProxyType | undefined), call: v25.Type_21} {
    assert(this.isV25)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get isV26(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'e95d7239855ae1e0e7e7751c4e619a7674ff3e1e8948806cb649f0e9fb672879'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get asV26(): {real: Uint8Array, forceProxyType: (v26.ProxyType | undefined), call: v26.Type_21} {
    assert(this.isV26)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get isV28(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'b645b151b9880623d4a2820e7577fd7c76a80a5bbb2911dc7754a3da17895678'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get asV28(): {real: Uint8Array, forceProxyType: (v28.ProxyType | undefined), call: v28.Type_21} {
    assert(this.isV28)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get isV29(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '4369e959f0be59d5d6405540ad46c2df494d056fab096f3f3a5876c21815927f'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get asV29(): {real: Uint8Array, forceProxyType: (v29.ProxyType | undefined), call: v29.Type_21} {
    assert(this.isV29)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get isV30(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '905d8b4539596183a8e03669e7e99b7486ef82ae919e9cb572bc704ed4840ae3'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get asV30(): {real: Uint8Array, forceProxyType: (v30.ProxyType | undefined), call: v30.Type_21} {
    assert(this.isV30)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get isV9050(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '41a6c0e39ad6cbb1d962694214644d84a821abc9fbae08c88e16e804bd84c368'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get asV9050(): {real: Uint8Array, forceProxyType: (v9050.ProxyType | undefined), call: v9050.Type_21} {
    assert(this.isV9050)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get isV9080(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'e3397f0b87ac78026dcca9bbbbedd00f2d0428ce9a49677debdef92a88d62bee'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get asV9080(): {real: Uint8Array, forceProxyType: (v9080.ProxyType | undefined), call: v9080.Type_21} {
    assert(this.isV9080)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get isV9090(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'e919e4477144bc4152e57c2ba4c6ed27cae9aa5951ce2df86d2e8aff97da51b8'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get asV9090(): {real: Uint8Array, forceProxyType: (v9090.ProxyType | undefined), call: v9090.Type_21} {
    assert(this.isV9090)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get isV9100(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '4727db03308d9ee8d3ff8843022ce9326d73f891dfeac51e041ef44fa6c156af'
  }

  /**
   *  Dispatch the given `call` from an account that the sender is authorised for through
   *  `add_proxy`.
   * 
   *  Removes any corresponding announcement(s).
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Parameters:
   *  - `real`: The account that the proxy will make a call on behalf of.
   *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *  - `call`: The call to be made by the `real` account.
   * 
   *  # <weight>
   *  Weight is a function of the number of proxies the user has (P).
   *  # </weight>
   */
  get asV9100(): {real: Uint8Array, forceProxyType: (v9100.ProxyType | undefined), call: v9100.Type_21} {
    assert(this.isV9100)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get isV9110(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '4599b3a5b06d9b0a04e716c2304537972dca44cbeeecd57c5412ba38239535bb'
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get asV9110(): {real: v9110.AccountId32, forceProxyType: (v9110.ProxyType | undefined), call: v9110.Call} {
    assert(this.isV9110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get isV9140(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'f6647b9d575c8bae1364c5b939d9f8412286037899d792d806eaf7071ee30463'
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get asV9140(): {real: v9140.AccountId32, forceProxyType: (v9140.ProxyType | undefined), call: v9140.Call} {
    assert(this.isV9140)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get isV9170(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'a60f5edca695b0a5cf29efbbb70c8d12406c8666cab107aaad1fa569aad4ebb5'
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get asV9170(): {real: v9170.AccountId32, forceProxyType: (v9170.ProxyType | undefined), call: v9170.Call} {
    assert(this.isV9170)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get isV9180(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '278900822c6bee6ee78f357a1b1e15641779edb3f51ef0559dddc81fb8abd333'
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get asV9180(): {real: v9180.AccountId32, forceProxyType: (v9180.ProxyType | undefined), call: v9180.Call} {
    assert(this.isV9180)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get isV9190(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'b1f4865a5a78e66570d226177f860e2e8366cfbccb15eaa7336596a1ffaa40dc'
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get asV9190(): {real: v9190.AccountId32, forceProxyType: (v9190.ProxyType | undefined), call: v9190.Call} {
    assert(this.isV9190)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get isV9220(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'b7ec23690a6dc6876262320d223b793103a7a238e78401a12baa302ef1ef271b'
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get asV9220(): {real: v9220.AccountId32, forceProxyType: (v9220.ProxyType | undefined), call: v9220.Call} {
    assert(this.isV9220)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get isV9230(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'd33282d5903788cf21b5b9b55d3992debd0d618255160f0e3602f78e90dbbd7b'
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get asV9230(): {real: v9230.AccountId32, forceProxyType: (v9230.ProxyType | undefined), call: v9230.Call} {
    assert(this.isV9230)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get isV9250(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '830fd2709adac4be38705dbc7ca152a611209588d9c2cb67f9b397c035fa9499'
  }

  /**
   * Dispatch the given `call` from an account that the sender is authorised for through
   * `add_proxy`.
   * 
   * Removes any corresponding announcement(s).
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * Parameters:
   * - `real`: The account that the proxy will make a call on behalf of.
   * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   * - `call`: The call to be made by the `real` account.
   * 
   * # <weight>
   * Weight is a function of the number of proxies the user has (P).
   * # </weight>
   */
  get asV9250(): {real: v9250.AccountId32, forceProxyType: (v9250.ProxyType | undefined), call: v9250.Call} {
    assert(this.isV9250)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9250
  }

  get asLatest(): {real: v9250.AccountId32, forceProxyType: (v9250.ProxyType | undefined), call: v9250.Call} {
    deprecateLatest()
    return this.asV9250
  }
}

export class StakingBondCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'staking.bond')
  }

  /**
   *  Take the origin account as a stash and lock up `value` of its balance. `controller` will
   *  be the account that controls it.
   * 
   *  `value` must be more than the `minimum_balance` specified by `T::Currency`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash account.
   * 
   *  Emits `Bonded`.
   * 
   *  # <weight>
   *  - Independent of the arguments. Moderate complexity.
   *  - O(1).
   *  - Three extra DB entries.
   * 
   *  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
   *  unless the `origin` falls below _existential deposit_ and gets removed as dust.
   *  ------------------
   *  Base Weight: 67.87 µs
   *  DB Weight:
   *  - Read: Bonded, Ledger, [Origin Account], Current Era, History Depth, Locks
   *  - Write: Bonded, Payee, [Origin Account], Locks, Ledger
   *  # </weight>
   */
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('staking.bond') === '20db399e4963916b83c2636d8d5e414b30d79d868ca62d05181259e5d0c02e7e'
  }

  /**
   *  Take the origin account as a stash and lock up `value` of its balance. `controller` will
   *  be the account that controls it.
   * 
   *  `value` must be more than the `minimum_balance` specified by `T::Currency`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash account.
   * 
   *  Emits `Bonded`.
   * 
   *  # <weight>
   *  - Independent of the arguments. Moderate complexity.
   *  - O(1).
   *  - Three extra DB entries.
   * 
   *  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
   *  unless the `origin` falls below _existential deposit_ and gets removed as dust.
   *  ------------------
   *  Base Weight: 67.87 µs
   *  DB Weight:
   *  - Read: Bonded, Ledger, [Origin Account], Current Era, History Depth, Locks
   *  - Write: Bonded, Payee, [Origin Account], Locks, Ledger
   *  # </weight>
   */
  get asV0(): {controller: Uint8Array, value: bigint, payee: v0.RewardDestination} {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Take the origin account as a stash and lock up `value` of its balance. `controller` will
   *  be the account that controls it.
   * 
   *  `value` must be more than the `minimum_balance` specified by `T::Currency`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash account.
   * 
   *  Emits `Bonded`.
   * 
   *  # <weight>
   *  - Independent of the arguments. Moderate complexity.
   *  - O(1).
   *  - Three extra DB entries.
   * 
   *  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
   *  unless the `origin` falls below _existential deposit_ and gets removed as dust.
   *  ------------------
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: Bonded, Ledger, [Origin Account], Current Era, History Depth, Locks
   *  - Write: Bonded, Payee, [Origin Account], Locks, Ledger
   *  # </weight>
   */
  get isV28(): boolean {
    return this.ctx._chain.getCallHash('staking.bond') === '6c5de9285e9c4ba450dfa1ed6ebededa6083cc2b06cee317e92c1f89751818c6'
  }

  /**
   *  Take the origin account as a stash and lock up `value` of its balance. `controller` will
   *  be the account that controls it.
   * 
   *  `value` must be more than the `minimum_balance` specified by `T::Currency`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash account.
   * 
   *  Emits `Bonded`.
   * 
   *  # <weight>
   *  - Independent of the arguments. Moderate complexity.
   *  - O(1).
   *  - Three extra DB entries.
   * 
   *  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
   *  unless the `origin` falls below _existential deposit_ and gets removed as dust.
   *  ------------------
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: Bonded, Ledger, [Origin Account], Current Era, History Depth, Locks
   *  - Write: Bonded, Payee, [Origin Account], Locks, Ledger
   *  # </weight>
   */
  get asV28(): {controller: v28.GenericMultiAddress, value: bigint, payee: v28.RewardDestination} {
    assert(this.isV28)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Take the origin account as a stash and lock up `value` of its balance. `controller` will
   * be the account that controls it.
   * 
   * `value` must be more than the `minimum_balance` specified by `T::Currency`.
   * 
   * The dispatch origin for this call must be _Signed_ by the stash account.
   * 
   * Emits `Bonded`.
   * # <weight>
   * - Independent of the arguments. Moderate complexity.
   * - O(1).
   * - Three extra DB entries.
   * 
   * NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
   * unless the `origin` falls below _existential deposit_ and gets removed as dust.
   * ------------------
   * # </weight>
   */
  get isV9110(): boolean {
    return this.ctx._chain.getCallHash('staking.bond') === 'c0b607a5cbdc40ee9aed26b3c86cfe3159aeccd5ac4e9005210dd39d0317ba48'
  }

  /**
   * Take the origin account as a stash and lock up `value` of its balance. `controller` will
   * be the account that controls it.
   * 
   * `value` must be more than the `minimum_balance` specified by `T::Currency`.
   * 
   * The dispatch origin for this call must be _Signed_ by the stash account.
   * 
   * Emits `Bonded`.
   * # <weight>
   * - Independent of the arguments. Moderate complexity.
   * - O(1).
   * - Three extra DB entries.
   * 
   * NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
   * unless the `origin` falls below _existential deposit_ and gets removed as dust.
   * ------------------
   * # </weight>
   */
  get asV9110(): {controller: v9110.MultiAddress, value: bigint, payee: v9110.RewardDestination} {
    assert(this.isV9110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9110
  }

  get asLatest(): {controller: v9110.MultiAddress, value: bigint, payee: v9110.RewardDestination} {
    deprecateLatest()
    return this.asV9110
  }
}

export class StakingBondExtraCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'staking.bondExtra' || this.ctx.extrinsic.name === 'staking.bond_extra')
  }

  /**
   *  Add some extra amount that have appeared in the stash `free_balance` into the balance up
   *  for staking.
   * 
   *  Use this if there are additional funds in your stash account that you wish to bond.
   *  Unlike [`bond`] or [`unbond`] this function does not impose any limitation on the amount
   *  that can be added.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller and
   *  it can be only called when [`EraElectionStatus`] is `Closed`.
   * 
   *  Emits `Bonded`.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - O(1).
   *  - One DB entry.
   *  ------------
   *  Base Weight: 54.88 µs
   *  DB Weight:
   *  - Read: Era Election Status, Bonded, Ledger, [Origin Account], Locks
   *  - Write: [Origin Account], Locks, Ledger
   *  # </weight>
   */
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('staking.bond_extra') === 'f92c56c980d6a55c468653fc3149548edcf2481e5da53835a201cafa7dc02fd8'
  }

  /**
   *  Add some extra amount that have appeared in the stash `free_balance` into the balance up
   *  for staking.
   * 
   *  Use this if there are additional funds in your stash account that you wish to bond.
   *  Unlike [`bond`] or [`unbond`] this function does not impose any limitation on the amount
   *  that can be added.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller and
   *  it can be only called when [`EraElectionStatus`] is `Closed`.
   * 
   *  Emits `Bonded`.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - O(1).
   *  - One DB entry.
   *  ------------
   *  Base Weight: 54.88 µs
   *  DB Weight:
   *  - Read: Era Election Status, Bonded, Ledger, [Origin Account], Locks
   *  - Write: [Origin Account], Locks, Ledger
   *  # </weight>
   */
  get asV0(): {maxAdditional: bigint} {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV0
  }

  get asLatest(): {maxAdditional: bigint} {
    deprecateLatest()
    return this.asV0
  }
}

export class StakingPayoutStakersCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'staking.payoutStakers' || this.ctx.extrinsic.name === 'staking.payout_stakers')
  }

  /**
   *  Pay out all the stakers behind a single validator for a single era.
   * 
   *  - `validator_stash` is the stash account of the validator. Their nominators, up to
   *    `T::MaxNominatorRewardedPerValidator`, will also receive their rewards.
   *  - `era` may be any era between `[current_era - history_depth; current_era]`.
   * 
   *  The origin of this call must be _Signed_. Any account can call this function, even if
   *  it is not one of the stakers.
   * 
   *  This can only be called when [`EraElectionStatus`] is `Closed`.
   * 
   *  # <weight>
   *  - Time complexity: at most O(MaxNominatorRewardedPerValidator).
   *  - Contains a limited number of reads and writes.
   *  -----------
   *  N is the Number of payouts for the validator (including the validator)
   *  Base Weight: 110 + 54.2 * N µs (Median Slopes)
   *  DB Weight:
   *  - Read: EraElectionStatus, CurrentEra, HistoryDepth, MigrateEra, ErasValidatorReward,
   *          ErasStakersClipped, ErasRewardPoints, ErasValidatorPrefs (8 items)
   *  - Read Each: Bonded, Ledger, Payee, Locks, System Account (5 items)
   *  - Write Each: System Account, Locks, Ledger (3 items)
   *  # </weight>
   */
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('staking.payout_stakers') === '1a09dc413ed4b8ce5cbcdc282b798636ca24268cca001e43fc92d892de3b6a5f'
  }

  /**
   *  Pay out all the stakers behind a single validator for a single era.
   * 
   *  - `validator_stash` is the stash account of the validator. Their nominators, up to
   *    `T::MaxNominatorRewardedPerValidator`, will also receive their rewards.
   *  - `era` may be any era between `[current_era - history_depth; current_era]`.
   * 
   *  The origin of this call must be _Signed_. Any account can call this function, even if
   *  it is not one of the stakers.
   * 
   *  This can only be called when [`EraElectionStatus`] is `Closed`.
   * 
   *  # <weight>
   *  - Time complexity: at most O(MaxNominatorRewardedPerValidator).
   *  - Contains a limited number of reads and writes.
   *  -----------
   *  N is the Number of payouts for the validator (including the validator)
   *  Base Weight: 110 + 54.2 * N µs (Median Slopes)
   *  DB Weight:
   *  - Read: EraElectionStatus, CurrentEra, HistoryDepth, MigrateEra, ErasValidatorReward,
   *          ErasStakersClipped, ErasRewardPoints, ErasValidatorPrefs (8 items)
   *  - Read Each: Bonded, Ledger, Payee, Locks, System Account (5 items)
   *  - Write Each: System Account, Locks, Ledger (3 items)
   *  # </weight>
   */
  get asV0(): {validatorStash: Uint8Array, era: number} {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV0
  }

  get asLatest(): {validatorStash: Uint8Array, era: number} {
    deprecateLatest()
    return this.asV0
  }
}

export class StakingSetControllerCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'staking.setController' || this.ctx.extrinsic.name === 'staking.set_controller')
  }

  /**
   *  (Re-)set the controller of a stash.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  ----------
   *  Base Weight: 25.22 µs
   *  DB Weight:
   *  - Read: Bonded, Ledger New Controller, Ledger Old Controller
   *  - Write: Bonded, Ledger New Controller, Ledger Old Controller
   *  # </weight>
   */
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('staking.set_controller') === 'bbdd03dc244a9d87deceeb91d015d7ef52746b99580b1474586c8699a77574e1'
  }

  /**
   *  (Re-)set the controller of a stash.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  ----------
   *  Base Weight: 25.22 µs
   *  DB Weight:
   *  - Read: Bonded, Ledger New Controller, Ledger Old Controller
   *  - Write: Bonded, Ledger New Controller, Ledger Old Controller
   *  # </weight>
   */
  get asV0(): {controller: Uint8Array} {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  (Re-)set the controller of a stash.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  ----------
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: Bonded, Ledger New Controller, Ledger Old Controller
   *  - Write: Bonded, Ledger New Controller, Ledger Old Controller
   *  # </weight>
   */
  get isV28(): boolean {
    return this.ctx._chain.getCallHash('staking.set_controller') === '61b4041aa7366e679d366d2062deb643451b64015c330746395765e6865e5af2'
  }

  /**
   *  (Re-)set the controller of a stash.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  ----------
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: Bonded, Ledger New Controller, Ledger Old Controller
   *  - Write: Bonded, Ledger New Controller, Ledger Old Controller
   *  # </weight>
   */
  get asV28(): {controller: v28.GenericMultiAddress} {
    assert(this.isV28)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * (Re-)set the controller of a stash.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   * # <weight>
   * - Independent of the arguments. Insignificant complexity.
   * - Contains a limited number of reads.
   * - Writes are limited to the `origin` account key.
   * ----------
   * Weight: O(1)
   * DB Weight:
   * - Read: Bonded, Ledger New Controller, Ledger Old Controller
   * - Write: Bonded, Ledger New Controller, Ledger Old Controller
   * # </weight>
   */
  get isV9110(): boolean {
    return this.ctx._chain.getCallHash('staking.set_controller') === '81dc3a18eb19c7f258654686fb92e5bf48185191f2c59179a5b4626965fc66cd'
  }

  /**
   * (Re-)set the controller of a stash.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   * # <weight>
   * - Independent of the arguments. Insignificant complexity.
   * - Contains a limited number of reads.
   * - Writes are limited to the `origin` account key.
   * ----------
   * Weight: O(1)
   * DB Weight:
   * - Read: Bonded, Ledger New Controller, Ledger Old Controller
   * - Write: Bonded, Ledger New Controller, Ledger Old Controller
   * # </weight>
   */
  get asV9110(): {controller: v9110.MultiAddress} {
    assert(this.isV9110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9110
  }

  get asLatest(): {controller: v9110.MultiAddress} {
    deprecateLatest()
    return this.asV9110
  }
}

export class StakingSetPayeeCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'staking.setPayee' || this.ctx.extrinsic.name === 'staking.set_payee')
  }

  /**
   *  (Re-)set the payment target for a controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  ---------
   *  - Base Weight: 11.33 µs
   *  - DB Weight:
   *      - Read: Ledger
   *      - Write: Payee
   *  # </weight>
   */
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('staking.set_payee') === 'e3e8a6a5ee204c56e926f714a3d580d47fe315d3b243872e40cc8959db768aa8'
  }

  /**
   *  (Re-)set the payment target for a controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  ---------
   *  - Base Weight: 11.33 µs
   *  - DB Weight:
   *      - Read: Ledger
   *      - Write: Payee
   *  # </weight>
   */
  get asV0(): {payee: v0.RewardDestination} {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * (Re-)set the payment target for a controller.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   * # <weight>
   * - Independent of the arguments. Insignificant complexity.
   * - Contains a limited number of reads.
   * - Writes are limited to the `origin` account key.
   * ---------
   * - Weight: O(1)
   * - DB Weight:
   *     - Read: Ledger
   *     - Write: Payee
   * # </weight>
   */
  get isV9110(): boolean {
    return this.ctx._chain.getCallHash('staking.set_payee') === 'e882138b8d0371da862d058ac00f1def3ca0f71ab72eda3fbfb7d75b5fa16515'
  }

  /**
   * (Re-)set the payment target for a controller.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   * # <weight>
   * - Independent of the arguments. Insignificant complexity.
   * - Contains a limited number of reads.
   * - Writes are limited to the `origin` account key.
   * ---------
   * - Weight: O(1)
   * - DB Weight:
   *     - Read: Ledger
   *     - Write: Payee
   * # </weight>
   */
  get asV9110(): {payee: v9110.RewardDestination} {
    assert(this.isV9110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9110
  }

  get asLatest(): {payee: v9110.RewardDestination} {
    deprecateLatest()
    return this.asV9110
  }
}

export class StakingUnbondCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'staking.unbond')
  }

  /**
   *  Schedule a portion of the stash to be unlocked ready for transfer out after the bond
   *  period ends. If this leaves an amount actively bonded less than
   *  T::Currency::minimum_balance(), then it is increased to the full amount.
   * 
   *  Once the unlock period is done, you can call `withdraw_unbonded` to actually move
   *  the funds out of management ready for transfer.
   * 
   *  No more than a limited number of unlocking chunks (see `MAX_UNLOCKING_CHUNKS`)
   *  can co-exists at the same time. In that case, [`Call::withdraw_unbonded`] need
   *  to be called first to remove some of the chunks (if possible).
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
   * 
   *  Emits `Unbonded`.
   * 
   *  See also [`Call::withdraw_unbonded`].
   * 
   *  # <weight>
   *  - Independent of the arguments. Limited but potentially exploitable complexity.
   *  - Contains a limited number of reads.
   *  - Each call (requires the remainder of the bonded balance to be above `minimum_balance`)
   *    will cause a new entry to be inserted into a vector (`Ledger.unlocking`) kept in storage.
   *    The only way to clean the aforementioned storage item is also user-controlled via
   *    `withdraw_unbonded`.
   *  - One DB entry.
   *  ----------
   *  Base Weight: 50.34 µs
   *  DB Weight:
   *  - Read: Era Election Status, Ledger, Current Era, Locks, [Origin Account]
   *  - Write: [Origin Account], Locks, Ledger
   *  </weight>
   */
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('staking.unbond') === 'd13cb91c3f61510beece366e7f7c2d0705f01d70f9bc28721d2437cd210a3372'
  }

  /**
   *  Schedule a portion of the stash to be unlocked ready for transfer out after the bond
   *  period ends. If this leaves an amount actively bonded less than
   *  T::Currency::minimum_balance(), then it is increased to the full amount.
   * 
   *  Once the unlock period is done, you can call `withdraw_unbonded` to actually move
   *  the funds out of management ready for transfer.
   * 
   *  No more than a limited number of unlocking chunks (see `MAX_UNLOCKING_CHUNKS`)
   *  can co-exists at the same time. In that case, [`Call::withdraw_unbonded`] need
   *  to be called first to remove some of the chunks (if possible).
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
   * 
   *  Emits `Unbonded`.
   * 
   *  See also [`Call::withdraw_unbonded`].
   * 
   *  # <weight>
   *  - Independent of the arguments. Limited but potentially exploitable complexity.
   *  - Contains a limited number of reads.
   *  - Each call (requires the remainder of the bonded balance to be above `minimum_balance`)
   *    will cause a new entry to be inserted into a vector (`Ledger.unlocking`) kept in storage.
   *    The only way to clean the aforementioned storage item is also user-controlled via
   *    `withdraw_unbonded`.
   *  - One DB entry.
   *  ----------
   *  Base Weight: 50.34 µs
   *  DB Weight:
   *  - Read: Era Election Status, Ledger, Current Era, Locks, [Origin Account]
   *  - Write: [Origin Account], Locks, Ledger
   *  </weight>
   */
  get asV0(): {value: bigint} {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV0
  }

  get asLatest(): {value: bigint} {
    deprecateLatest()
    return this.asV0
  }
}

export class UtilityBatchCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'utility.batch')
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop. Calls must fulfil the
   *  `IsCallable` filter unless the origin is `Root`.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'b601474590df7dad2366e5378a570bed86d35ffe6ffc6261a6b79635275b72dc'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop. Calls must fulfil the
   *  `IsCallable` filter unless the origin is `Root`.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV0(): {calls: v0.Type_21[]} {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop. Calls must fulfil the
   *  `IsCallable` filter unless the origin is `Root`.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV5(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '98591379c0a9bf023750da170ab4f332688fceb870532ef16e7859b7f4b72070'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop. Calls must fulfil the
   *  `IsCallable` filter unless the origin is `Root`.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV5(): {calls: v5.Type_21[]} {
    assert(this.isV5)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop. Calls must fulfil the
   *  `IsCallable` filter unless the origin is `Root`.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV6(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '49112c5930905c70a51eb627af013cace748746303ad6c369e6871634d3ec522'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop. Calls must fulfil the
   *  `IsCallable` filter unless the origin is `Root`.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV6(): {calls: v6.Type_21[]} {
    assert(this.isV6)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop. Calls must fulfil the
   *  `IsCallable` filter unless the origin is `Root`.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV7(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'bd437d585bd328af44724fe72c32e1290988b38ac6bb59e9c061dc9d36b40fc3'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop. Calls must fulfil the
   *  `IsCallable` filter unless the origin is `Root`.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV7(): {calls: v7.Type_21[]} {
    assert(this.isV7)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV9(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'f12d77377cc0665b5ef8b2539d08508a77e10d0c7b147b5db8ff0a5e160dc339'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV9(): {calls: v9.Type_21[]} {
    assert(this.isV9)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV10(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '752bd0b51a15b134a3b69d310fef95289caadf53f72e8ebf6e004f80dbfd5162'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV10(): {calls: v10.Type_21[]} {
    assert(this.isV10)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV11(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '81a1bbaba8c836457eb3ae67ae0a14379a92ec73d98caecb616027b935d1ec97'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV11(): {calls: v11.Type_21[]} {
    assert(this.isV11)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV13(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'e191a6b4469a730ac2c9d99d7d1bf26b8eba8eb372c88ca8ef33b142c07173cb'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV13(): {calls: v13.Type_21[]} {
    assert(this.isV13)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV14(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '4b2fe6192e690bb4d52c80f14779df220a864fe502eec9f38a5dde216a6729e8'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV14(): {calls: v14.Type_21[]} {
    assert(this.isV14)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV15(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'dc6dafbd04891de07385ef89cf41e58498e1055f8183a8836011473996992a2a'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV15(): {calls: v15.Type_21[]} {
    assert(this.isV15)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV17(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'cc2545971a0ffdc824f974595d6cef86d24f447886effb7fddc646f5864691b4'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV17(): {calls: v17.Type_21[]} {
    assert(this.isV17)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV18(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '937a5c0db5fabb0a8535b5fcc5fe2d99860c2b17bc2d974b1d2e319b85eae56f'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV18(): {calls: v18.Type_21[]} {
    assert(this.isV18)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV23(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '622880e36c0dc8bab8cfd46d229cc4962a9ad0d7ae841d31cd241a3cb712deee'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV23(): {calls: v23.Type_21[]} {
    assert(this.isV23)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV24(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '67e1c933278ecb7cb1849f0611be968e6fbb17a75e77d5bd4bb2b7e82d559a71'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV24(): {calls: v24.Type_21[]} {
    assert(this.isV24)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV25(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '8512358f5519ac891551f9701182b1a11c8cf3f8fb6df37c106b05c801ee5187'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Base weight: 14.39 + .987 * c µs
   *  - Plus the sum of the weights of the `calls`.
   *  - Plus one additional event. (repeat read/write)
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV25(): {calls: v25.Type_21[]} {
    assert(this.isV25)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV26(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '015c2df82b127326f6844b77eb239395bbea77a617840cbf913ac72ac923ddb2'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Trait::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV26(): {calls: v26.Type_21[]} {
    assert(this.isV26)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Config::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV28(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '5e0a2b8fb29282d3dc592f9ac9a0a30444798a6163f408a989b82959ef7789ee'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Config::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV28(): {calls: v28.Type_21[]} {
    assert(this.isV28)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Config::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV29(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '075b2eed6a610a1fdb692b9cee790dbfdc987bec08a1700853be792ed961f063'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Config::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV29(): {calls: v29.Type_21[]} {
    assert(this.isV29)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Config::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV30(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '86cc089e0526c2dc4dc6531ac6c14a5db40e9fdd9d706b8d3a3e4915e0db49f2'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Config::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV30(): {calls: v30.Type_21[]} {
    assert(this.isV30)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Config::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV9050(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '170c3844186448bffe1b61cca66823d2ff6b1268363a97d4de7656aa0461cec1'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Config::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV9050(): {calls: v9050.Type_21[]} {
    assert(this.isV9050)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Config::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV9080(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '1db23b83f4215679bd3549723cb965926695c1cbca3653dec1cc497802b43e7c'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Config::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV9080(): {calls: v9080.Type_21[]} {
    assert(this.isV9080)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *    exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Config::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV9090(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '1f4f3ad28fa1b9bf268af96092a7917fc26e5af8eb94cee58410a94be9b63177'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *    exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Config::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV9090(): {calls: v9090.Type_21[]} {
    assert(this.isV9090)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *    exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Config::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV9100(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'a5ad022c9b39cbb9b2edb874ef513884ad9ef3b8bc21a56fe00f015cf62f279e'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *    exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   *  If origin is root then call are dispatch without checking origin filter. (This includes
   *  bypassing `frame_system::Config::BaseCallFilter`).
   * 
   *  # <weight>
   *  - Complexity: O(C) where C is the number of calls to be batched.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV9100(): {calls: v9100.Type_21[]} {
    assert(this.isV9100)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get isV9110(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'c8a1fe4b35e8ef06ea3ff5ba5f62100b60ed021108c4b3b898c22485f0dad2e7'
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get asV9110(): {calls: v9110.Call[]} {
    assert(this.isV9110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get isV9140(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'c2971352e8f7fb489143fa3bed4a6f12f9f11275e06163b35bbca5f73638e4a7'
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get asV9140(): {calls: v9140.Call[]} {
    assert(this.isV9140)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get isV9170(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'd661f75294ba3acf37242369d4e405388ccd01ee237a50ea377cf43264b3b61c'
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get asV9170(): {calls: v9170.Call[]} {
    assert(this.isV9170)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get isV9180(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'dadb3173bcdad27ab1cd092c9d5ce57eb1b5c08c61fab2a07a6595406ae140a4'
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get asV9180(): {calls: v9180.Call[]} {
    assert(this.isV9180)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get isV9190(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '0c15c73e14af5ede1d23d5e210df1872d15b58734c998b1259f0a7fc2413405c'
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get asV9190(): {calls: v9190.Call[]} {
    assert(this.isV9190)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get isV9220(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'a306ce3fab81f1263217f322880466bc813d7675ca072e9de602b51fb53cb88f'
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get asV9220(): {calls: v9220.Call[]} {
    assert(this.isV9220)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get isV9230(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'ff3b94c294995d001603f951cbfe2efa289701bc6a9c6b4a3b3b252da4167efa'
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get asV9230(): {calls: v9230.Call[]} {
    assert(this.isV9230)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get isV9250(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'c48a18800c152f6762a96c10a7e16bd1d78900e3a0ce799d833f8595c5385834'
  }

  /**
   * Send a batch of dispatch calls.
   * 
   * May be called from any origin.
   * 
   * - `calls`: The calls to be dispatched from the same origin. The number of call must not
   *   exceed the constant: `batched_calls_limit` (available in constant metadata).
   * 
   * If origin is root then call are dispatch without checking origin filter. (This includes
   * bypassing `frame_system::Config::BaseCallFilter`).
   * 
   * # <weight>
   * - Complexity: O(C) where C is the number of calls to be batched.
   * # </weight>
   * 
   * This will return `Ok` in all circumstances. To determine the success of the batch, an
   * event is deposited. If a call failed and the batch was interrupted, then the
   * `BatchInterrupted` event is deposited, along with the number of successful calls made
   * and the error of the failed call. If all were successful, then the `BatchCompleted`
   * event is deposited.
   */
  get asV9250(): {calls: v9250.Call[]} {
    assert(this.isV9250)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9250
  }

  get asLatest(): {calls: v9250.Call[]} {
    deprecateLatest()
    return this.asV9250
  }
}
