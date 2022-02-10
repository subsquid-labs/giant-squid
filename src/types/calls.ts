import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v1032 from './v1032'
import * as v1038 from './v1038'
import * as v1039 from './v1039'
import * as v1040 from './v1040'
import * as v1042 from './v1042'
import * as v1050 from './v1050'
import * as v1054 from './v1054'
import * as v1055 from './v1055'
import * as v1058 from './v1058'
import * as v1062 from './v1062'
import * as v2005 from './v2005'
import * as v2007 from './v2007'
import * as v2011 from './v2011'
import * as v2013 from './v2013'
import * as v2015 from './v2015'
import * as v2022 from './v2022'
import * as v2023 from './v2023'
import * as v2024 from './v2024'
import * as v2025 from './v2025'
import * as v2026 from './v2026'
import * as v2028 from './v2028'
import * as v2029 from './v2029'
import * as v2030 from './v2030'
import * as v9010 from './v9010'
import * as v9030 from './v9030'
import * as v9040 from './v9040'
import * as v9050 from './v9050'
import * as v9080 from './v9080'
import * as v9090 from './v9090'
import * as v9100 from './v9100'
import * as v9111 from './v9111'
import * as v9122 from './v9122'
import * as v9130 from './v9130'

export class BalancesForceTransferCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'balances.forceTransfer' || this.ctx.extrinsic.name === 'balances.force_transfer')
  }

  /**
   *  Exactly as `transfer`, except the origin must be root and the source account may be
   *  specified.
   */
  get isV1020(): boolean {
    return this.ctx._chain.getCallHash('balances.force_transfer') === '798e78230462c072eb835843b15e5dbb52ed7e48c4659c7771edf93678da5d1a'
  }

  /**
   *  Exactly as `transfer`, except the origin must be root and the source account may be
   *  specified.
   */
  get asV1020(): {source: never, dest: never, value: bigint} {
    assert(this.isV1020)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Exactly as `transfer`, except the origin must be root and the source account may be
   *  specified.
   */
  get isV1050(): boolean {
    return this.ctx._chain.getCallHash('balances.force_transfer') === '48ccdb7abfac6d3acb339fd1d6912592ff73e36843f4c2ff2a6391d0bc52c47b'
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
    return this.ctx._chain.getCallHash('balances.force_transfer') === '74e0c568fd6aca804d5c95e3415122299eca0afd4f876360f062e58d8881cb81'
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
    return this.ctx._chain.getCallHash('balances.force_transfer') === 'd28a011034c5f4a4fcd372830bec93a4de8ca0c3249ed0cf9cfa7a996e4699ad'
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
    return this.ctx._chain.getCallHash('balances.transfer') === 'd3ee17e0bcb8d69e4c8fcae25b4558989323bae7b3b4dbf1d41a6f8c34690c5d'
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
  get asV1020(): {dest: never, value: bigint} {
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
    return this.ctx._chain.getCallHash('balances.transfer') === '1b7076e31a9d48be4c397b21777c6c35944b02b8844b65d1277f5450f865914f'
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
    return this.ctx._chain.getCallHash('balances.transfer') === '05861090e3108003cb97b4ef075bbc3dfe3882247b47c71f4b64e099139d62f0'
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
    return this.ctx._chain.getCallHash('balances.transfer') === 'ff4b494557a07e4b7ad8549ff49c59a84a533072550505647509d9073121b8b0'
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
    return this.ctx._chain.getCallHash('balances.transfer_all') === '493fabe756e4896b57451bbe4e981656c7d83752667982f0c2aa8f7d398a3988'
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
    return this.ctx._chain.getCallHash('balances.transfer_all') === '522b34dee997311495b019abaa49d6d9881169474c06e6adb08ca8ccec3ee5a2'
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
    return this.ctx._chain.getCallHash('balances.transfer_keep_alive') === '96f186815eb585bfce3949c41c64261322e2585e0b7a6ed52ede080e889d50ae'
  }

  /**
   *  Same as the [`transfer`] call, but with a check that the transfer will not kill the
   *  origin account.
   * 
   *  99% of the time you want [`transfer`] instead.
   * 
   *  [`transfer`]: struct.Module.html#method.transfer
   */
  get asV1020(): {dest: never, value: bigint} {
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
    return this.ctx._chain.getCallHash('balances.transfer_keep_alive') === '16b20d76aac049e10c74897f02f21e245d6d33ee473533aa8c2c686fd0be5afc'
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
    return this.ctx._chain.getCallHash('balances.transfer_keep_alive') === '84fead3d66e86fa3ddf466cc911cf8795e024963ea9f8de058d40a6c76610b16'
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
    return this.ctx._chain.getCallHash('balances.transfer_keep_alive') === 'c4b844c5a53c671fa5f15670e214796fc7f80b16157126b329fc150eabda8a85'
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
    return this.ctx._chain.getCallHash('crowdloan.contribute') === '7e270a150cdcaaeedcd4d5f9f63c1aca1458511945179275ed4a8011802c9802'
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
    return this.ctx._chain.getCallHash('crowdloan.create') === 'e59ab6ad69501285e01e5938c0ce77c0c2a17e4d3514776d15b694fdbc734fcd'
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
  get isV2005(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === '338f0eaa430150c20e52fa22cf1209b1826cf91a9cdbe2e62a267f93baab7c1b'
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
  get asV2005(): {threshold: number, otherSignatories: Uint8Array[], maybeTimepoint: (v2005.Timepoint | undefined), call: v2005.Type_172} {
    assert(this.isV2005)
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
  get isV2007(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === 'd4c817e1f8e7e842dcca9746be641bca3fc09fc7ad20eabf02cca6ae3f6a14cc'
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
  get asV2007(): {threshold: number, otherSignatories: Uint8Array[], maybeTimepoint: (v2007.Timepoint | undefined), call: v2007.Type_173} {
    assert(this.isV2007)
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
  get isV2011(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === 'c3ad21e6a8dba21f6f9ff577e771da2dd39de77d4f19e6eaa98c5ea81564f0a8'
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
  get asV2011(): {threshold: number, otherSignatories: Uint8Array[], maybeTimepoint: (v2011.Timepoint | undefined), call: Uint8Array, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV2011)
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
  get isV9130(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === 'a066899c7faab921281944c8a59478f726dec1b38979db02f92a1e34ec156893'
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
  get asV9130(): {threshold: number, otherSignatories: v9130.AccountId32[], maybeTimepoint: (v9130.Timepoint | undefined), call: v9130.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV9130)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {threshold: number, otherSignatories: v9130.AccountId32[], maybeTimepoint: (v9130.Timepoint | undefined), call: v9130.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    deprecateLatest()
    return this.asV9130
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
  get isV2005(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '10ba5d3574fc0541d87644a73415434a33cbe3596ae1b4e9eb1713c79edbac6f'
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
  get asV2005(): {real: Uint8Array, forceProxyType: (v2005.ProxyType | undefined), call: v2005.Type_172} {
    assert(this.isV2005)
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
  get isV2007(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'e7dabe970d689aaeb0670439ce9f58db5ed6299586c898f7ae5812229cec14f5'
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
  get asV2007(): {real: Uint8Array, forceProxyType: (v2007.ProxyType | undefined), call: v2007.Type_173} {
    assert(this.isV2007)
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
  get isV2011(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '0c1fbca210a9579248c21af47c94b470536c5f83eb99c8c2ef3ada7cb042369e'
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
  get asV2011(): {real: Uint8Array, forceProxyType: (v2011.ProxyType | undefined), call: v2011.Type_174} {
    assert(this.isV2011)
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
  get isV2013(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '287b08dd13dd18f4f497ac668d3bd3756edf38bd029d969c3d12941680b1dfc2'
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
  get asV2013(): {real: Uint8Array, forceProxyType: (v2013.ProxyType | undefined), call: v2013.Type_174} {
    assert(this.isV2013)
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
  get isV2015(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '93e28c4ad41d13437918a18e29fdf44e32c02f653983f22e3cabc3d3699fc826'
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
  get asV2015(): {real: Uint8Array, forceProxyType: (v2015.ProxyType | undefined), call: v2015.Type_177} {
    assert(this.isV2015)
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
  get isV2022(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'e924e50c55c262628e0edc824af59c73c204da6f9e3c29b9494895d5fa3119fe'
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
  get asV2022(): {real: Uint8Array, forceProxyType: (v2022.ProxyType | undefined), call: v2022.Type_177} {
    assert(this.isV2022)
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
  get isV2023(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'a77060748152621f1a126e8a33238e45f5158e4cb790fce676d893c41cd0af3c'
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
  get asV2023(): {real: Uint8Array, forceProxyType: (v2023.ProxyType | undefined), call: v2023.Type_179} {
    assert(this.isV2023)
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
  get isV2024(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'ae4248447ac98328f94f615fdfa27d5bda054b1b569de90be64b91496dab735b'
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
  get asV2024(): {real: Uint8Array, forceProxyType: (v2024.ProxyType | undefined), call: v2024.Type_179} {
    assert(this.isV2024)
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
  get isV2025(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '4196f56daf7309175f355c3735e6b48f813e743529f0fb528cdb5e80e73d676f'
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
  get asV2025(): {real: Uint8Array, forceProxyType: (v2025.ProxyType | undefined), call: v2025.Type_180} {
    assert(this.isV2025)
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
  get isV2026(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '69fae078ddc6e83fb5caee192b5cc467561dc2165eefd27ba7fb1437deed0bf6'
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
  get asV2026(): {real: Uint8Array, forceProxyType: (v2026.ProxyType | undefined), call: v2026.Type_179} {
    assert(this.isV2026)
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
  get isV2028(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'a288ba5835e5859212e95373e56a0617706151bd69d335bd747a140230e3dbb2'
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
  get asV2028(): {real: Uint8Array, forceProxyType: (v2028.ProxyType | undefined), call: v2028.Type_184} {
    assert(this.isV2028)
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
  get isV2029(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'bc61adc641a91d78c969b9b1ac241a823c3603f33171b5ad930fc9a5678f14c4'
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
  get asV2029(): {real: Uint8Array, forceProxyType: (v2029.ProxyType | undefined), call: v2029.Type_184} {
    assert(this.isV2029)
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
  get isV2030(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '55c98637c394a0ec28de21bbf16e80e260169a31ef45d71f8282469f43b49862'
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
  get asV2030(): {real: Uint8Array, forceProxyType: (v2030.ProxyType | undefined), call: v2030.Type_123} {
    assert(this.isV2030)
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
  get isV9010(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'a5bca5e035d02c07e4e64d6d4f817c493abef27dec0e0698bd1224bbc476d364'
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
  get asV9010(): {real: Uint8Array, forceProxyType: (v9010.ProxyType | undefined), call: v9010.Type_123} {
    assert(this.isV9010)
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
  get isV9030(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'a5341ce82509e36d57f79a670770af967e0cbd1d16b157efa0c84479467f6298'
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
  get asV9030(): {real: Uint8Array, forceProxyType: (v9030.ProxyType | undefined), call: v9030.Type_123} {
    assert(this.isV9030)
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
  get isV9040(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === 'eaf79e33ad215005987d7d90c0cc1e112def25bdb3415f6692dca8954828edf6'
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
  get asV9040(): {real: Uint8Array, forceProxyType: (v9040.ProxyType | undefined), call: v9040.Type_123} {
    assert(this.isV9040)
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
    return this.ctx._chain.getCallHash('proxy.proxy') === 'e866454e8a257b911db866eaaf9277f6feeb6da591d259e09f466f4aa7fba7bc'
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
  get asV9050(): {real: Uint8Array, forceProxyType: (v9050.ProxyType | undefined), call: v9050.Type_124} {
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
    return this.ctx._chain.getCallHash('proxy.proxy') === 'f93f44f11a5ac822bb77ecb21a673451caa59ba6659b8ca67fc412632a3fa4db'
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
  get asV9080(): {real: Uint8Array, forceProxyType: (v9080.ProxyType | undefined), call: v9080.Type_125} {
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
    return this.ctx._chain.getCallHash('proxy.proxy') === '29b45b98913f0a1e5dfe6d1b86585806a9c1e9ce0355d61eac6c3ae1b79ba940'
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
  get asV9090(): {real: Uint8Array, forceProxyType: (v9090.ProxyType | undefined), call: v9090.Type_125} {
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
    return this.ctx._chain.getCallHash('proxy.proxy') === '0571ac3ece42527e35b9e74f1eb22d8f7d9ca513b83be2a2a17e2bb77e0bb8ee'
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
  get asV9100(): {real: Uint8Array, forceProxyType: (v9100.ProxyType | undefined), call: v9100.Type_125} {
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
  get isV9111(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '8eee0b89adff35d10ec00a70ed7e5e48004853d0cdbdc45d54cde55b8cfb66a2'
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
  get asV9111(): {real: v9111.AccountId32, forceProxyType: (v9111.ProxyType | undefined), call: v9111.Call} {
    assert(this.isV9111)
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
  get isV9122(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '53cdaecda92f976ffdbcdab61f955c71d869ece53af31e578934736f5439acf8'
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
  get asV9122(): {real: v9122.AccountId32, forceProxyType: (v9122.ProxyType | undefined), call: v9122.Call} {
    assert(this.isV9122)
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
  get isV9130(): boolean {
    return this.ctx._chain.getCallHash('proxy.proxy') === '7c64c41198293d1d964fbea2395cfb0ae9d7263e72e2a3788e03f168d7a34cd9'
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
  get asV9130(): {real: v9130.AccountId32, forceProxyType: (v9130.ProxyType | undefined), call: v9130.Call} {
    assert(this.isV9130)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {real: v9130.AccountId32, forceProxyType: (v9130.ProxyType | undefined), call: v9130.Call} {
    deprecateLatest()
    return this.asV9130
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
    return this.ctx._chain.getCallHash('staking.payout_stakers') === '1fed710492a18f6b425d1332be2515dc1402588e0b4798e067293eb2104339e1'
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

export class UtilityBatchCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'utility.batch')
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV1032(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '88f814e44093e0c061b09015f36d6755aa1c5c550e13782f3b00c0621b1c2a3e'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV1032(): {calls: v1032.Type_93[]} {
    assert(this.isV1032)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV1038(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'bae654ce98a764ca4a084837a134444611398744a9219656ee2cbc2e0b41b271'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV1038(): {calls: v1038.Type_93[]} {
    assert(this.isV1038)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV1039(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'c387bb2d9e1be522ac46cb3538105a56718fefe213a9453ca82478f0f60aca66'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV1039(): {calls: v1039.Type_93[]} {
    assert(this.isV1039)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV1040(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'ca5f17ef29d359e451876fdfea2622fc003d64ce220f0bf3a1bbc23a4a514620'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV1040(): {calls: v1040.Type_93[]} {
    assert(this.isV1040)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV1042(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '861dfda4c7fc29999d51b2b3b73be6d5d676215ba91ead2ddc4797729f9081f4'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV1042(): {calls: v1042.Type_93[]} {
    assert(this.isV1042)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV1050(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '40f33674bb296ed2978a07fe08d3bd0d368e6ef5b87ddc56d845c14108ec1484'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV1050(): {calls: v1050.Type_97[]} {
    assert(this.isV1050)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV1054(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '4aebba3033f08bfb3791c6da1fbd7d00ec0fa6c1730119f9cf49870ae17a2339'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV1054(): {calls: v1054.Type_97[]} {
    assert(this.isV1054)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV1055(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '4d0c2804e114cde37c396eedb806e269ba0f34e27703dc0954c2678142613963'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV1055(): {calls: v1055.Type_100[]} {
    assert(this.isV1055)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get isV1058(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '7e73d82ee02dbedbd5cad8f6a04e0f0d31168d7afc7bcc0536afe7a270c71561'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
   * 
   *  May be called from any origin.
   * 
   *  - `calls`: The calls to be dispatched from the same origin.
   * 
   *  # <weight>
   *  - The sum of the weights of the `calls`.
   *  - One event.
   *  # </weight>
   * 
   *  This will return `Ok` in all circumstances. To determine the success of the batch, an
   *  event is deposited. If a call failed and the batch was interrupted, then the
   *  `BatchInterrupted` event is deposited, along with the number of successful calls made
   *  and the error of the failed call. If all were successful, then the `BatchCompleted`
   *  event is deposited.
   */
  get asV1058(): {calls: v1058.Type_160[]} {
    assert(this.isV1058)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
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
  get isV1062(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'a05d20f5ef52f74da7542ee4d651ff35aad10f18a051c4712c5bee6d3fa9b97a'
  }

  /**
   *  Send a batch of dispatch calls.
   * 
   *  This will execute until the first one fails and then stop.
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
  get asV1062(): {calls: v1062.Type_159[]} {
    assert(this.isV1062)
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
  get isV2005(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '2bcde12ecde5a78dd86b6d965bd8a01c776bf336661f229cd73f106c56c5c470'
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
  get asV2005(): {calls: v2005.Type_172[]} {
    assert(this.isV2005)
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
  get isV2007(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '8a751dc225fab1d7974d240412880326921b7cd72062138161570329b67fc05e'
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
  get asV2007(): {calls: v2007.Type_173[]} {
    assert(this.isV2007)
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
  get isV2011(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '38376d6f335f176751e87537121157606acb29b9b502a4f85dabaa167fdd6df9'
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
  get asV2011(): {calls: v2011.Type_174[]} {
    assert(this.isV2011)
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
  get isV2013(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'c2845ed42dc788fd5d77672fabe58226310484cc1caf87eb2ecd5663c1c1b8d0'
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
  get asV2013(): {calls: v2013.Type_174[]} {
    assert(this.isV2013)
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
  get isV2015(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '1bb359d68743464f0fad7598d4b1a28bf01db0658b6532f89750af872d1ec94d'
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
  get asV2015(): {calls: v2015.Type_177[]} {
    assert(this.isV2015)
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
  get isV2022(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '679b20b7590dc9727bc3d5266cbe8d1008c093d644aea69d25e24b2b43ea6ad5'
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
  get asV2022(): {calls: v2022.Type_177[]} {
    assert(this.isV2022)
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
  get isV2023(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '1467e10b50ed17cf201b45190bb4c14eea7030ca9ad4e8a4c8bbf572a7b2bb05'
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
  get asV2023(): {calls: v2023.Type_179[]} {
    assert(this.isV2023)
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
  get isV2024(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '006e4f8a42bc40152a24b4e7e8fdfbea947e7d890e956d6307358f4f2ff685e9'
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
  get asV2024(): {calls: v2024.Type_179[]} {
    assert(this.isV2024)
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
  get isV2025(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'b00627745bf5ef94256e2e8ae37f4d2a931e840a6ac2b6cb2950271f22ffbf62'
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
  get asV2025(): {calls: v2025.Type_180[]} {
    assert(this.isV2025)
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
  get isV2026(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '7d2c4e3ee05fe7d4643a8298248180b1be09501911241bd0f941c31a06fd202d'
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
  get asV2026(): {calls: v2026.Type_179[]} {
    assert(this.isV2026)
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
  get isV2028(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '99e4556ecdc31a54936a6b872dc84ef381c9d81d99569a2346839d27447ff6e5'
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
  get asV2028(): {calls: v2028.Type_184[]} {
    assert(this.isV2028)
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
  get isV2029(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '14e6bde245842198f92b4cffd80d9efab52b76e166063d4076b50e7dbad7d8d3'
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
  get asV2029(): {calls: v2029.Type_184[]} {
    assert(this.isV2029)
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
  get isV2030(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '75a740d44fb05691178c6706ed1ec4203cdf534597a51ef24edac9b7c925ab1d'
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
  get asV2030(): {calls: v2030.Type_123[]} {
    assert(this.isV2030)
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
  get isV9010(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'a09825fbbedf49c006f8abe98732a207ab4ee2b877f806c671db233dbbf2b0a6'
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
  get asV9010(): {calls: v9010.Type_123[]} {
    assert(this.isV9010)
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
  get isV9030(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '431d7602b704b1e5fa23a542e8cdd7426c572a9d7ea0c5987b2a9e1f485c506e'
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
  get asV9030(): {calls: v9030.Type_123[]} {
    assert(this.isV9030)
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
  get isV9040(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'bf3565f0804b61fd40a3be5a6b02f3132e0f4d6bcb8a1bee608927636ce6ac3d'
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
  get asV9040(): {calls: v9040.Type_123[]} {
    assert(this.isV9040)
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
    return this.ctx._chain.getCallHash('utility.batch') === '67eaa7d27e09b54a5f4d674bc7e240dcca966e1562133db98588867361f513bd'
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
  get asV9050(): {calls: v9050.Type_124[]} {
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
    return this.ctx._chain.getCallHash('utility.batch') === 'f900726c727cdd29d0f59d6efbaac348e562d80d67eb76d7b0c40b7bab6324b8'
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
  get asV9080(): {calls: v9080.Type_125[]} {
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
    return this.ctx._chain.getCallHash('utility.batch') === '3896200420112de76c8c77db08fcf5d5ac1b24f276ce0059dea0f4f635b99a89'
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
  get asV9090(): {calls: v9090.Type_125[]} {
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
    return this.ctx._chain.getCallHash('utility.batch') === '296d333e75d778cc4e77496344978bd10519d93c1dea9f8112e20e860be42abc'
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
  get asV9100(): {calls: v9100.Type_125[]} {
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
  get isV9111(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '58226b61f7873fdcdb59614550a3f152e3be6e2025100abcbce278af91346273'
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
  get asV9111(): {calls: v9111.Call[]} {
    assert(this.isV9111)
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
  get isV9122(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === 'c60231c6d5432b95b103c729355bccf3bbb78db929e3bc36e89af6655781630d'
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
  get asV9122(): {calls: v9122.Call[]} {
    assert(this.isV9122)
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
  get isV9130(): boolean {
    return this.ctx._chain.getCallHash('utility.batch') === '24073583c2749160a5e9c61ab70b5be6d8ec930e4774b556bcba2c5424c568dc'
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
  get asV9130(): {calls: v9130.Call[]} {
    assert(this.isV9130)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {calls: v9130.Call[]} {
    deprecateLatest()
    return this.asV9130
  }
}
