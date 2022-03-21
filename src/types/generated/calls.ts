import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v13 from './v13'

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
  get isV13(): boolean {
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
  get asV13(): {source: Uint8Array, dest: Uint8Array, value: bigint} {
    assert(this.isV13)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV13
  }

  get asLatest(): {source: Uint8Array, dest: Uint8Array, value: bigint} {
    deprecateLatest()
    return this.asV13
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
  get isV13(): boolean {
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
  get asV13(): {dest: Uint8Array, value: bigint} {
    assert(this.isV13)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV13
  }

  get asLatest(): {dest: Uint8Array, value: bigint} {
    deprecateLatest()
    return this.asV13
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
  get isV22(): boolean {
    return this.ctx._chain.getCallHash('balances.transfer_all') === '55f3f63b765a5b0a714fcbe6c824b0f6fc21773aab999a719c36e7dc7db49575'
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
  get asV22(): {dest: Uint8Array, keepAlive: boolean} {
    assert(this.isV22)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV22
  }

  get asLatest(): {dest: Uint8Array, keepAlive: boolean} {
    deprecateLatest()
    return this.asV22
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
   *  [`transfer`]: struct.Pallet.html#method.transfer
   *  # <weight>
   *  - Cheaper than transfer because account cannot be killed.
   *  - Base Weight: 51.4 µs
   *  - DB Weight: 1 Read and 1 Write to dest (sender is in overlay already)
   *  #</weight>
   */
  get isV13(): boolean {
    return this.ctx._chain.getCallHash('balances.transfer_keep_alive') === 'cf5bb376709277883598390b3462e93b0f3c383df391c0649728c965e8da82fd'
  }

  /**
   *  Same as the [`transfer`] call, but with a check that the transfer will not kill the
   *  origin account.
   * 
   *  99% of the time you want [`transfer`] instead.
   * 
   *  [`transfer`]: struct.Pallet.html#method.transfer
   *  # <weight>
   *  - Cheaper than transfer because account cannot be killed.
   *  - Base Weight: 51.4 µs
   *  - DB Weight: 1 Read and 1 Write to dest (sender is in overlay already)
   *  #</weight>
   */
  get asV13(): {dest: Uint8Array, value: bigint} {
    assert(this.isV13)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV13
  }

  get asLatest(): {dest: Uint8Array, value: bigint} {
    deprecateLatest()
    return this.asV13
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
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: Bonded, Ledger, [Origin Account], Current Era, History Depth, Locks
   *  - Write: Bonded, Payee, [Origin Account], Locks, Ledger
   *  # </weight>
   */
  get isV13(): boolean {
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
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: Bonded, Ledger, [Origin Account], Current Era, History Depth, Locks
   *  - Write: Bonded, Payee, [Origin Account], Locks, Ledger
   *  # </weight>
   */
  get asV13(): {controller: Uint8Array, value: bigint, payee: v13.RewardDestination} {
    assert(this.isV13)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV13
  }

  get asLatest(): {controller: Uint8Array, value: bigint, payee: v13.RewardDestination} {
    deprecateLatest()
    return this.asV13
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
   *  DB Weight:
   *  - Read: Era Election Status, Bonded, Ledger, [Origin Account], Locks
   *  - Write: [Origin Account], Locks, Ledger
   *  # </weight>
   */
  get isV13(): boolean {
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
   *  DB Weight:
   *  - Read: Era Election Status, Bonded, Ledger, [Origin Account], Locks
   *  - Write: [Origin Account], Locks, Ledger
   *  # </weight>
   */
  get asV13(): {maxAdditional: bigint} {
    assert(this.isV13)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV13
  }

  get asLatest(): {maxAdditional: bigint} {
    deprecateLatest()
    return this.asV13
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
   *  Weight:
   *  - Reward Destination Staked: O(N)
   *  - Reward Destination Controller (Creating): O(N)
   *  DB Weight:
   *  - Read: EraElectionStatus, CurrentEra, HistoryDepth, ErasValidatorReward,
   *          ErasStakersClipped, ErasRewardPoints, ErasValidatorPrefs (8 items)
   *  - Read Each: Bonded, Ledger, Payee, Locks, System Account (5 items)
   *  - Write Each: System Account, Locks, Ledger (3 items)
   * 
   *    NOTE: weights are assuming that payouts are made to alive stash account (Staked).
   *    Paying even a dead controller is cheaper weight-wise. We don't do any refunds here.
   *  # </weight>
   */
  get isV13(): boolean {
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
   *  Weight:
   *  - Reward Destination Staked: O(N)
   *  - Reward Destination Controller (Creating): O(N)
   *  DB Weight:
   *  - Read: EraElectionStatus, CurrentEra, HistoryDepth, ErasValidatorReward,
   *          ErasStakersClipped, ErasRewardPoints, ErasValidatorPrefs (8 items)
   *  - Read Each: Bonded, Ledger, Payee, Locks, System Account (5 items)
   *  - Write Each: System Account, Locks, Ledger (3 items)
   * 
   *    NOTE: weights are assuming that payouts are made to alive stash account (Staked).
   *    Paying even a dead controller is cheaper weight-wise. We don't do any refunds here.
   *  # </weight>
   */
  get asV13(): {validatorStash: Uint8Array, era: number} {
    assert(this.isV13)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV13
  }

  get asLatest(): {validatorStash: Uint8Array, era: number} {
    deprecateLatest()
    return this.asV13
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
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: EraElectionStatus, Ledger, CurrentEra, Locks, BalanceOf Stash,
   *  - Write: Locks, Ledger, BalanceOf Stash,
   *  </weight>
   */
  get isV13(): boolean {
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
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: EraElectionStatus, Ledger, CurrentEra, Locks, BalanceOf Stash,
   *  - Write: Locks, Ledger, BalanceOf Stash,
   *  </weight>
   */
  get asV13(): {value: bigint} {
    assert(this.isV13)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV13
  }

  get asLatest(): {value: bigint} {
    deprecateLatest()
    return this.asV13
  }
}
