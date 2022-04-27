import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v1020 from './v1020'
import * as v1050 from './v1050'
import * as v2028 from './v2028'
import * as v9010 from './v9010'
import * as v9050 from './v9050'
import * as v9111 from './v9111'

export class BalancesForceTransferCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'balances.forceTransfer' || this.ctx.extrinsic.name === 'balances.force_transfer')
  }

  /**
   *  Exactly as `transfer`, except the origin must be root and the source account may be
   *  specified.
   */
  get isV1020(): boolean {
    return this.ctx._chain.getCallHash('balances.force_transfer') === 'df4a214d4dde3e82d3b36a6bb537e569f58b42cd75a9ad78b1b909171e93b042'
  }

  /**
   *  Exactly as `transfer`, except the origin must be root and the source account may be
   *  specified.
   */
  get asV1020(): {source: v1020.Type_17, dest: v1020.Type_17, value: bigint} {
    assert(this.isV1020)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Exactly as `transfer`, except the origin must be root and the source account may be
   *  specified.
   */
  get isV1050(): boolean {
    return this.ctx._chain.getCallHash('balances.force_transfer') === '2fe8348cf811b833de74f02f6eeab668dbfad8a5d53274dd89837666ed3eb6fe'
  }

  /**
   *  Exactly as `transfer`, except the origin must be root and the source account may be
   *  specified.
   */
  get asV1050(): {source: Uint8Array, dest: Uint8Array, value: bigint} {
    assert(this.isV1050)
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
  get isV2028(): boolean {
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
  get asV2028(): {source: v2028.GenericMultiAddress, dest: v2028.GenericMultiAddress, value: bigint} {
    assert(this.isV2028)
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
  get isV9111(): boolean {
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
  get asV9111(): {source: v9111.MultiAddress, dest: v9111.MultiAddress, value: bigint} {
    assert(this.isV9111)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9111
  }

  get asLatest(): {source: v9111.MultiAddress, dest: v9111.MultiAddress, value: bigint} {
    deprecateLatest()
    return this.asV9111
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
   *    - Removing enough funds from an account will trigger
   *      `T::DustRemoval::on_unbalanced` and `T::OnFreeBalanceZero::on_free_balance_zero`.
   *    - `transfer_keep_alive` works the same way as `transfer`, but has an additional
   *      check that the transfer will not kill the origin account.
   * 
   *  # </weight>
   */
  get isV1020(): boolean {
    return this.ctx._chain.getCallHash('balances.transfer') === '5a96e49eaf0745110a2342c53e5619233745028a575c67865c4ad4921e77634b'
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
   *    - Removing enough funds from an account will trigger
   *      `T::DustRemoval::on_unbalanced` and `T::OnFreeBalanceZero::on_free_balance_zero`.
   *    - `transfer_keep_alive` works the same way as `transfer`, but has an additional
   *      check that the transfer will not kill the origin account.
   * 
   *  # </weight>
   */
  get asV1020(): {dest: v1020.Type_17, value: bigint} {
    assert(this.isV1020)
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
   * 
   *  # </weight>
   */
  get isV1050(): boolean {
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
   * 
   *  # </weight>
   */
  get asV1050(): {dest: Uint8Array, value: bigint} {
    assert(this.isV1050)
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
  get isV2028(): boolean {
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
  get asV2028(): {dest: v2028.GenericMultiAddress, value: bigint} {
    assert(this.isV2028)
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
  get isV9111(): boolean {
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
  get asV9111(): {dest: v9111.MultiAddress, value: bigint} {
    assert(this.isV9111)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9111
  }

  get asLatest(): {dest: v9111.MultiAddress, value: bigint} {
    deprecateLatest()
    return this.asV9111
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
  get isV9111(): boolean {
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
  get asV9111(): {dest: v9111.MultiAddress, keepAlive: boolean} {
    assert(this.isV9111)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9111
  }

  get asLatest(): {dest: v9111.MultiAddress, keepAlive: boolean} {
    deprecateLatest()
    return this.asV9111
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
   */
  get isV1020(): boolean {
    return this.ctx._chain.getCallHash('balances.transfer_keep_alive') === '5a96e49eaf0745110a2342c53e5619233745028a575c67865c4ad4921e77634b'
  }

  /**
   *  Same as the [`transfer`] call, but with a check that the transfer will not kill the
   *  origin account.
   * 
   *  99% of the time you want [`transfer`] instead.
   * 
   *  [`transfer`]: struct.Module.html#method.transfer
   */
  get asV1020(): {dest: v1020.Type_17, value: bigint} {
    assert(this.isV1020)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Same as the [`transfer`] call, but with a check that the transfer will not kill the
   *  origin account.
   * 
   *  99% of the time you want [`transfer`] instead.
   * 
   *  [`transfer`]: struct.Module.html#method.transfer
   */
  get isV1050(): boolean {
    return this.ctx._chain.getCallHash('balances.transfer_keep_alive') === 'cf5bb376709277883598390b3462e93b0f3c383df391c0649728c965e8da82fd'
  }

  /**
   *  Same as the [`transfer`] call, but with a check that the transfer will not kill the
   *  origin account.
   * 
   *  99% of the time you want [`transfer`] instead.
   * 
   *  [`transfer`]: struct.Module.html#method.transfer
   */
  get asV1050(): {dest: Uint8Array, value: bigint} {
    assert(this.isV1050)
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
  get isV2028(): boolean {
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
  get asV2028(): {dest: v2028.GenericMultiAddress, value: bigint} {
    assert(this.isV2028)
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
  get isV9111(): boolean {
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
  get asV9111(): {dest: v9111.MultiAddress, value: bigint} {
    assert(this.isV9111)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9111
  }

  get asLatest(): {dest: v9111.MultiAddress, value: bigint} {
    deprecateLatest()
    return this.asV9111
  }
}

export class CrowdloanContributeCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'crowdloan.contribute')
  }

  /**
   *  Contribute to a crowd sale. This will transfer some balance over to fund a parachain
   *  slot. It will be withdrawable when the crowdloan has ended and the funds are unused.
   */
  get isV9010(): boolean {
    return this.ctx._chain.getCallHash('crowdloan.contribute') === 'c85a49d78a97667f6d8d7cdda206ad3ba38bd873ab2e82a42135a31c48152a6c'
  }

  /**
   *  Contribute to a crowd sale. This will transfer some balance over to fund a parachain
   *  slot. It will be withdrawable when the crowdloan has ended and the funds are unused.
   */
  get asV9010(): {index: number, value: bigint, signature: (v9010.MultiSignature | undefined)} {
    assert(this.isV9010)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9010
  }

  get asLatest(): {index: number, value: bigint, signature: (v9010.MultiSignature | undefined)} {
    deprecateLatest()
    return this.asV9010
  }
}

export class CrowdloanCreateCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'crowdloan.create')
  }

  /**
   *  Create a new crowdloaning campaign for a parachain slot with the given lease period range.
   * 
   *  This applies a lock to your parachain configuration, ensuring that it cannot be changed
   *  by the parachain manager.
   */
  get isV9010(): boolean {
    return this.ctx._chain.getCallHash('crowdloan.create') === '9d0529ac9fb92b6a7eca157299243acd0d2eb82a352509475556c79f78f47aa3'
  }

  /**
   *  Create a new crowdloaning campaign for a parachain slot with the given lease period range.
   * 
   *  This applies a lock to your parachain configuration, ensuring that it cannot be changed
   *  by the parachain manager.
   */
  get asV9010(): {index: number, cap: bigint, firstPeriod: number, lastPeriod: number, end: number, verifier: (v9010.MultiSigner | undefined)} {
    assert(this.isV9010)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9010
  }

  get asLatest(): {index: number, cap: bigint, firstPeriod: number, lastPeriod: number, end: number, verifier: (v9010.MultiSigner | undefined)} {
    deprecateLatest()
    return this.asV9010
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
   *  # <weight>
   *  - Independent of the arguments. Moderate complexity.
   *  - O(1).
   *  - Three extra DB entries.
   * 
   *  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned unless
   *  the `origin` falls below _existential deposit_ and gets removed as dust.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this.ctx._chain.getCallHash('staking.bond') === '3cace3eeefbd92edd61c1cab1250874814a606c95414451a83315e0301be4cff'
  }

  /**
   *  Take the origin account as a stash and lock up `value` of its balance. `controller` will
   *  be the account that controls it.
   * 
   *  `value` must be more than the `minimum_balance` specified by `T::Currency`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash account.
   * 
   *  # <weight>
   *  - Independent of the arguments. Moderate complexity.
   *  - O(1).
   *  - Three extra DB entries.
   * 
   *  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned unless
   *  the `origin` falls below _existential deposit_ and gets removed as dust.
   *  # </weight>
   */
  get asV1020(): {controller: v1020.Type_17, value: bigint, payee: v1020.RewardDestination} {
    assert(this.isV1020)
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
   *  # <weight>
   *  - Independent of the arguments. Moderate complexity.
   *  - O(1).
   *  - Three extra DB entries.
   * 
   *  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned unless
   *  the `origin` falls below _existential deposit_ and gets removed as dust.
   *  # </weight>
   */
  get isV1050(): boolean {
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
   *  # <weight>
   *  - Independent of the arguments. Moderate complexity.
   *  - O(1).
   *  - Three extra DB entries.
   * 
   *  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned unless
   *  the `origin` falls below _existential deposit_ and gets removed as dust.
   *  # </weight>
   */
  get asV1050(): {controller: Uint8Array, value: bigint, payee: v1050.RewardDestination} {
    assert(this.isV1050)
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
  get isV2028(): boolean {
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
  get asV2028(): {controller: v2028.GenericMultiAddress, value: bigint, payee: v2028.RewardDestination} {
    assert(this.isV2028)
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
  get isV9111(): boolean {
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
  get asV9111(): {controller: v9111.MultiAddress, value: bigint, payee: v9111.RewardDestination} {
    assert(this.isV9111)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9111
  }

  get asLatest(): {controller: v9111.MultiAddress, value: bigint, payee: v9111.RewardDestination} {
    deprecateLatest()
    return this.asV9111
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
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - O(1).
   *  - One DB entry.
   *  # </weight>
   */
  get isV1020(): boolean {
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
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - O(1).
   *  - One DB entry.
   *  # </weight>
   */
  get asV1020(): {maxAdditional: bigint} {
    assert(this.isV1020)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1020
  }

  get asLatest(): {maxAdditional: bigint} {
    deprecateLatest()
    return this.asV1020
  }
}

export class StakingNominateCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'staking.nominate')
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets`,
   *  which is capped at `MAX_NOMINATIONS`.
   *  - Both the reads and writes follow a similar pattern.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this.ctx._chain.getCallHash('staking.nominate') === 'ef0d9859df5914c3ac406eb6255e894f22bdc249ab0f7f82c6f01029112924b1'
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets`,
   *  which is capped at `MAX_NOMINATIONS`.
   *  - Both the reads and writes follow a similar pattern.
   *  # </weight>
   */
  get asV1020(): {targets: v1020.Type_17[]} {
    assert(this.isV1020)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets`,
   *  which is capped at `MAX_NOMINATIONS`.
   *  - Both the reads and writes follow a similar pattern.
   *  # </weight>
   */
  get isV1050(): boolean {
    return this.ctx._chain.getCallHash('staking.nominate') === '730fc5a4090c1c566ea6d11126ba7258c98a461b0c6bfca8bf9e17e42f8801de'
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets`,
   *  which is capped at `MAX_NOMINATIONS`.
   *  - Both the reads and writes follow a similar pattern.
   *  # </weight>
   */
  get asV1050(): {targets: Uint8Array[]} {
    assert(this.isV1050)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era. This can only be called when
   *  [`EraElectionStatus`] is `Closed`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets` (N)
   *  which is capped at CompactAssignments::LIMIT (MAX_NOMINATIONS).
   *  - Both the reads and writes follow a similar pattern.
   *  ---------
   *  Weight: O(N)
   *  where N is the number of targets
   *  DB Weight:
   *  - Reads: Era Election Status, Ledger, Current Era
   *  - Writes: Validators, Nominators
   *  # </weight>
   */
  get isV2028(): boolean {
    return this.ctx._chain.getCallHash('staking.nominate') === 'a653cde167810e73479047a5ef0738fdd0dc4e9afa5b310a19c8335e4378f706'
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era. This can only be called when
   *  [`EraElectionStatus`] is `Closed`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets` (N)
   *  which is capped at CompactAssignments::LIMIT (MAX_NOMINATIONS).
   *  - Both the reads and writes follow a similar pattern.
   *  ---------
   *  Weight: O(N)
   *  where N is the number of targets
   *  DB Weight:
   *  - Reads: Era Election Status, Ledger, Current Era
   *  - Writes: Validators, Nominators
   *  # </weight>
   */
  get asV2028(): {targets: v2028.GenericMultiAddress[]} {
    assert(this.isV2028)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Declare the desire to nominate `targets` for the origin controller.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   * # <weight>
   * - The transaction's complexity is proportional to the size of `targets` (N)
   * which is capped at CompactAssignments::LIMIT (MAX_NOMINATIONS).
   * - Both the reads and writes follow a similar pattern.
   * # </weight>
   */
  get isV9111(): boolean {
    return this.ctx._chain.getCallHash('staking.nominate') === '4b7eca27044655bd9da5cc614a4bf774babc00decbed9ca59d95298b300d72de'
  }

  /**
   * Declare the desire to nominate `targets` for the origin controller.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   * # <weight>
   * - The transaction's complexity is proportional to the size of `targets` (N)
   * which is capped at CompactAssignments::LIMIT (MAX_NOMINATIONS).
   * - Both the reads and writes follow a similar pattern.
   * # </weight>
   */
  get asV9111(): {targets: v9111.MultiAddress[]} {
    assert(this.isV9111)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9111
  }

  get asLatest(): {targets: v9111.MultiAddress[]} {
    deprecateLatest()
    return this.asV9111
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
   *  # </weight>
   */
  get isV1058(): boolean {
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
   *  # </weight>
   */
  get asV1058(): {validatorStash: Uint8Array, era: number} {
    assert(this.isV1058)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1058
  }

  get asLatest(): {validatorStash: Uint8Array, era: number} {
    deprecateLatest()
    return this.asV1058
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
   *  # </weight>
   */
  get isV1020(): boolean {
    return this.ctx._chain.getCallHash('staking.set_controller') === 'ea495be34eb0363f94ad384fd20004dfec26ca760dc2776b92541482a1719f1b'
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
   *  # </weight>
   */
  get asV1020(): {controller: v1020.Type_17} {
    assert(this.isV1020)
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
   *  # </weight>
   */
  get isV1050(): boolean {
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
   *  # </weight>
   */
  get asV1050(): {controller: Uint8Array} {
    assert(this.isV1050)
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
  get isV2028(): boolean {
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
  get asV2028(): {controller: v2028.GenericMultiAddress} {
    assert(this.isV2028)
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
  get isV9111(): boolean {
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
  get asV9111(): {controller: v9111.MultiAddress} {
    assert(this.isV9111)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9111
  }

  get asLatest(): {controller: v9111.MultiAddress} {
    deprecateLatest()
    return this.asV9111
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
   *  # </weight>
   */
  get isV1020(): boolean {
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
   *  # </weight>
   */
  get asV1020(): {payee: v1020.RewardDestination} {
    assert(this.isV1020)
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
  get isV9111(): boolean {
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
  get asV9111(): {payee: v9111.RewardDestination} {
    assert(this.isV9111)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9111
  }

  get asLatest(): {payee: v9111.RewardDestination} {
    deprecateLatest()
    return this.asV9111
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
   * 
   *  See also [`Call::withdraw_unbonded`].
   * 
   *  # <weight>
   *  - Independent of the arguments. Limited but potentially exploitable complexity.
   *  - Contains a limited number of reads.
   *  - Each call (requires the remainder of the bonded balance to be above `minimum_balance`)
   *    will cause a new entry to be inserted into a vector (`Ledger.unlocking`) kept in storage.
   *    The only way to clean the aforementioned storage item is also user-controlled via `withdraw_unbonded`.
   *  - One DB entry.
   *  </weight>
   */
  get isV1020(): boolean {
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
   * 
   *  See also [`Call::withdraw_unbonded`].
   * 
   *  # <weight>
   *  - Independent of the arguments. Limited but potentially exploitable complexity.
   *  - Contains a limited number of reads.
   *  - Each call (requires the remainder of the bonded balance to be above `minimum_balance`)
   *    will cause a new entry to be inserted into a vector (`Ledger.unlocking`) kept in storage.
   *    The only way to clean the aforementioned storage item is also user-controlled via `withdraw_unbonded`.
   *  - One DB entry.
   *  </weight>
   */
  get asV1020(): {value: bigint} {
    assert(this.isV1020)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1020
  }

  get asLatest(): {value: bigint} {
    deprecateLatest()
    return this.asV1020
  }
}

export class StakingValidateCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'staking.validate')
  }

  /**
   *  Declare the desire to validate for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this.ctx._chain.getCallHash('staking.validate') === 'a03cfe73ae98f87de904386556fc6e78943abbd5d595884756c4155f8694e080'
  }

  /**
   *  Declare the desire to validate for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  # </weight>
   */
  get asV1020(): {prefs: v1020.ValidatorPrefsWithCommission} {
    assert(this.isV1020)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Declare the desire to validate for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  -----------
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: Era Election Status, Ledger
   *  - Write: Nominators, Validators
   *  # </weight>
   */
  get isV2028(): boolean {
    return this.ctx._chain.getCallHash('staking.validate') === '2a662df491d449985438edd4d2e6899fd06beebbaa59e759713811ade38308bf'
  }

  /**
   *  Declare the desire to validate for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  -----------
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: Era Election Status, Ledger
   *  - Write: Nominators, Validators
   *  # </weight>
   */
  get asV2028(): {prefs: v2028.ValidatorPrefsWithBlocked} {
    assert(this.isV2028)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV2028
  }

  get asLatest(): {prefs: v2028.ValidatorPrefsWithBlocked} {
    deprecateLatest()
    return this.asV2028
  }
}
