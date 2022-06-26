import assert from 'assert'
import {Chain, ChainContext, CallContext, Call, Result} from './support'
import * as v2000 from './v2000'
import * as v2011 from './v2011'
import * as v2022 from './v2022'
import * as v2032 from './v2032'
import * as v2042 from './v2042'
import * as v2080 from './v2080'

export class BalancesForceTransferCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Balances.force_transfer')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   * Exactly as `transfer`, except the origin must be root and the source account may be
   * specified.
   * # <weight>
   * - Same as transfer, but additional read and write because the source account is not
   *   assumed to be in the overlay.
   * # </weight>
   */
  get isV2000(): boolean {
    return this._chain.getCallHash('Balances.force_transfer') === '906df11f4f65ebd03a2b87ba248e1fba11c3a0bca42c892bee828bac3ec80348'
  }

  /**
   * Exactly as `transfer`, except the origin must be root and the source account may be
   * specified.
   * # <weight>
   * - Same as transfer, but additional read and write because the source account is not
   *   assumed to be in the overlay.
   * # </weight>
   */
  get asV2000(): {source: v2000.MultiAddress, dest: v2000.MultiAddress, value: bigint} {
    assert(this.isV2000)
    return this._chain.decodeCall(this.call)
  }
}

export class BalancesTransferCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Balances.transfer')
    this._chain = ctx._chain
    this.call = call
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
  get isV2000(): boolean {
    return this._chain.getCallHash('Balances.transfer') === 'c3f0f475940fc4bef49b298f76ba345680f20fc48d5899b4678314a07e2ce090'
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
  get asV2000(): {dest: v2000.MultiAddress, value: bigint} {
    assert(this.isV2000)
    return this._chain.decodeCall(this.call)
  }
}

export class BalancesTransferAllCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Balances.transfer_all')
    this._chain = ctx._chain
    this.call = call
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
  get isV2000(): boolean {
    return this._chain.getCallHash('Balances.transfer_all') === '56952003e07947f758a9928d8462037abffea6a7fa991c0d3451f5c47d45f254'
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
  get asV2000(): {dest: v2000.MultiAddress, keepAlive: boolean} {
    assert(this.isV2000)
    return this._chain.decodeCall(this.call)
  }
}

export class BalancesTransferKeepAliveCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Balances.transfer_keep_alive')
    this._chain = ctx._chain
    this.call = call
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
  get isV2000(): boolean {
    return this._chain.getCallHash('Balances.transfer_keep_alive') === 'c3f0f475940fc4bef49b298f76ba345680f20fc48d5899b4678314a07e2ce090'
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
  get asV2000(): {dest: v2000.MultiAddress, value: bigint} {
    assert(this.isV2000)
    return this._chain.decodeCall(this.call)
  }
}

export class CurrenciesTransferCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Currencies.transfer')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   * Transfer some balance to another account under `currency_id`.
   * 
   * The dispatch origin for this call must be `Signed` by the
   * transactor.
   */
  get isV2000(): boolean {
    return this._chain.getCallHash('Currencies.transfer') === '363725d8f0303d53dabf1a5996a9520d8c5fe3abca7640a8436bcbc43f46b6d7'
  }

  /**
   * Transfer some balance to another account under `currency_id`.
   * 
   * The dispatch origin for this call must be `Signed` by the
   * transactor.
   */
  get asV2000(): {dest: v2000.MultiAddress, currencyId: v2000.CurrencyId, amount: bigint} {
    assert(this.isV2000)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Transfer some balance to another account under `currency_id`.
   * 
   * The dispatch origin for this call must be `Signed` by the
   * transactor.
   */
  get isV2011(): boolean {
    return this._chain.getCallHash('Currencies.transfer') === '789d4f709fe23bf0a1586d4a685ebcc3362efaf89aac966552eac6cde594d28d'
  }

  /**
   * Transfer some balance to another account under `currency_id`.
   * 
   * The dispatch origin for this call must be `Signed` by the
   * transactor.
   */
  get asV2011(): {dest: v2011.MultiAddress, currencyId: v2011.CurrencyId, amount: bigint} {
    assert(this.isV2011)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Transfer some balance to another account under `currency_id`.
   * 
   * The dispatch origin for this call must be `Signed` by the
   * transactor.
   */
  get isV2022(): boolean {
    return this._chain.getCallHash('Currencies.transfer') === 'a7da4ad21ecaff7d2f61aa80e2721af882625d7784ab70c9d3e150ba31e0104f'
  }

  /**
   * Transfer some balance to another account under `currency_id`.
   * 
   * The dispatch origin for this call must be `Signed` by the
   * transactor.
   */
  get asV2022(): {dest: v2022.MultiAddress, currencyId: v2022.CurrencyId, amount: bigint} {
    assert(this.isV2022)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Transfer some balance to another account under `currency_id`.
   * 
   * The dispatch origin for this call must be `Signed` by the
   * transactor.
   */
  get isV2042(): boolean {
    return this._chain.getCallHash('Currencies.transfer') === 'f179e0335371d3c8efb735180ee45e3470fe438aca555f5c79fe12e8957030fa'
  }

  /**
   * Transfer some balance to another account under `currency_id`.
   * 
   * The dispatch origin for this call must be `Signed` by the
   * transactor.
   */
  get asV2042(): {dest: v2042.MultiAddress, currencyId: v2042.CurrencyId, amount: bigint} {
    assert(this.isV2042)
    return this._chain.decodeCall(this.call)
  }

  get isV2080(): boolean {
    return this._chain.getCallHash('Currencies.transfer') === '3ff2c33da0687132a52a8f6f220f21184e515605cd3d047ec7ebb3c8ad35381e'
  }

  get asV2080(): {dest: v2080.MultiAddress, currencyId: v2080.CurrencyId, amount: bigint} {
    assert(this.isV2080)
    return this._chain.decodeCall(this.call)
  }
}

export class XTokensTransferCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'XTokens.transfer')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   * Transfer native currencies.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get isV2000(): boolean {
    return this._chain.getCallHash('XTokens.transfer') === '549bc23af2b15d1ef029a24065c12589fb72c0ec56638a2d5527f5bc7891cb2a'
  }

  /**
   * Transfer native currencies.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get asV2000(): {currencyId: v2000.CurrencyId, amount: bigint, dest: v2000.VersionedMultiLocation, destWeight: bigint} {
    assert(this.isV2000)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Transfer native currencies.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get isV2011(): boolean {
    return this._chain.getCallHash('XTokens.transfer') === '519e0a2fee52a7964a31855b5757e1d3cd13658a812f1b4ae0b91c3ee3d79bd3'
  }

  /**
   * Transfer native currencies.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get asV2011(): {currencyId: v2011.CurrencyId, amount: bigint, dest: v2011.VersionedMultiLocation, destWeight: bigint} {
    assert(this.isV2011)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Transfer native currencies.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get isV2022(): boolean {
    return this._chain.getCallHash('XTokens.transfer') === 'a8db18f32e2498022a594a802194aed8618bdc29625d68f3c8baab6553665be2'
  }

  /**
   * Transfer native currencies.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get asV2022(): {currencyId: v2022.CurrencyId, amount: bigint, dest: v2022.VersionedMultiLocation, destWeight: bigint} {
    assert(this.isV2022)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Transfer native currencies.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get isV2042(): boolean {
    return this._chain.getCallHash('XTokens.transfer') === '8ee59781cb701d7549c2ef235213264bdf60593ec5c1fcbf9a006967295c25cd'
  }

  /**
   * Transfer native currencies.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get asV2042(): {currencyId: v2042.CurrencyId, amount: bigint, dest: v2042.VersionedMultiLocation, destWeight: bigint} {
    assert(this.isV2042)
    return this._chain.decodeCall(this.call)
  }

  get isV2080(): boolean {
    return this._chain.getCallHash('XTokens.transfer') === 'ac9acedc53b516498a500528f413e4488c6e4bf5fb0af39e65481a37c55a4d75'
  }

  get asV2080(): {currencyId: v2080.CurrencyId, amount: bigint, dest: v2080.VersionedMultiLocation, destWeight: bigint} {
    assert(this.isV2080)
    return this._chain.decodeCall(this.call)
  }
}

export class XTokensTransferMultiassetCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'XTokens.transfer_multiasset')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   * Transfer `MultiAsset`.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get isV2000(): boolean {
    return this._chain.getCallHash('XTokens.transfer_multiasset') === 'f33cd4d2466c1e767a4c2d9b00f7b71b359b07f3e78d76d466e3928a3e2ed9b8'
  }

  /**
   * Transfer `MultiAsset`.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get asV2000(): {asset: v2000.VersionedMultiAsset, dest: v2000.VersionedMultiLocation, destWeight: bigint} {
    assert(this.isV2000)
    return this._chain.decodeCall(this.call)
  }
}

export class XTokensTransferMultiassetWithFeeCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'XTokens.transfer_multiasset_with_fee')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   * Transfer `MultiAsset` specifying the fee and amount as separate.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * `fee` is the multiasset to be spent to pay for execution in
   * destination chain. Both fee and amount will be subtracted form the
   * callers balance For now we only accept fee and asset having the same
   * `MultiLocation` id.
   * 
   * If `fee` is not high enough to cover for the execution costs in the
   * destination chain, then the assets will be trapped in the
   * destination chain
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get isV2011(): boolean {
    return this._chain.getCallHash('XTokens.transfer_multiasset_with_fee') === '72aca3119f971190d4dd5493791879ff41295c5e290079c6179cb41be01e6226'
  }

  /**
   * Transfer `MultiAsset` specifying the fee and amount as separate.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * `fee` is the multiasset to be spent to pay for execution in
   * destination chain. Both fee and amount will be subtracted form the
   * callers balance For now we only accept fee and asset having the same
   * `MultiLocation` id.
   * 
   * If `fee` is not high enough to cover for the execution costs in the
   * destination chain, then the assets will be trapped in the
   * destination chain
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get asV2011(): {asset: v2011.VersionedMultiAsset, fee: v2011.VersionedMultiAsset, dest: v2011.VersionedMultiLocation, destWeight: bigint} {
    assert(this.isV2011)
    return this._chain.decodeCall(this.call)
  }
}

export class XTokensTransferMulticurrenciesCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'XTokens.transfer_multicurrencies')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   * Transfer several currencies specifying the item to be used as fee
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * `fee_item` is index of the currencies tuple that we want to use for
   * payment
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get isV2032(): boolean {
    return this._chain.getCallHash('XTokens.transfer_multicurrencies') === 'a2b19d9d4e6bce0676a4b28b17bbb911c35bc84e7adde3f6d2f5d28b38241e5f'
  }

  /**
   * Transfer several currencies specifying the item to be used as fee
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * `fee_item` is index of the currencies tuple that we want to use for
   * payment
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get asV2032(): {currencies: [v2032.CurrencyId, bigint][], feeItem: number, dest: v2032.VersionedMultiLocation, destWeight: bigint} {
    assert(this.isV2032)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Transfer several currencies specifying the item to be used as fee
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * `fee_item` is index of the currencies tuple that we want to use for
   * payment
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get isV2042(): boolean {
    return this._chain.getCallHash('XTokens.transfer_multicurrencies') === 'e80bd05b0f8a2637ad58d8018ab1c45b459ba824b174c47d9f89b995f0756bcc'
  }

  /**
   * Transfer several currencies specifying the item to be used as fee
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * `fee_item` is index of the currencies tuple that we want to use for
   * payment
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get asV2042(): {currencies: [v2042.CurrencyId, bigint][], feeItem: number, dest: v2042.VersionedMultiLocation, destWeight: bigint} {
    assert(this.isV2042)
    return this._chain.decodeCall(this.call)
  }

  get isV2080(): boolean {
    return this._chain.getCallHash('XTokens.transfer_multicurrencies') === '71b9281afabf869f34e2d6aad7a8fc9de09a8bd9a36777bdd74fcd7beee6a3d2'
  }

  get asV2080(): {currencies: [v2080.CurrencyId, bigint][], feeItem: number, dest: v2080.VersionedMultiLocation, destWeight: bigint} {
    assert(this.isV2080)
    return this._chain.decodeCall(this.call)
  }
}

export class XTokensTransferWithFeeCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'XTokens.transfer_with_fee')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   * Transfer native currencies specifying the fee and amount as
   * separate.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * `fee` is the amount to be spent to pay for execution in destination
   * chain. Both fee and amount will be subtracted form the callers
   * balance.
   * 
   * If `fee` is not high enough to cover for the execution costs in the
   * destination chain, then the assets will be trapped in the
   * destination chain
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get isV2011(): boolean {
    return this._chain.getCallHash('XTokens.transfer_with_fee') === '74fdb36d92d1b2f417c89516d16faafe1093e0223d7fa56e747c7a8f3d6b6d31'
  }

  /**
   * Transfer native currencies specifying the fee and amount as
   * separate.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * `fee` is the amount to be spent to pay for execution in destination
   * chain. Both fee and amount will be subtracted form the callers
   * balance.
   * 
   * If `fee` is not high enough to cover for the execution costs in the
   * destination chain, then the assets will be trapped in the
   * destination chain
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get asV2011(): {currencyId: v2011.CurrencyId, amount: bigint, fee: bigint, dest: v2011.VersionedMultiLocation, destWeight: bigint} {
    assert(this.isV2011)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Transfer native currencies specifying the fee and amount as
   * separate.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * `fee` is the amount to be spent to pay for execution in destination
   * chain. Both fee and amount will be subtracted form the callers
   * balance.
   * 
   * If `fee` is not high enough to cover for the execution costs in the
   * destination chain, then the assets will be trapped in the
   * destination chain
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get isV2022(): boolean {
    return this._chain.getCallHash('XTokens.transfer_with_fee') === '7a29eec4e391c80e142048d95eeac304ccf2abd715d3ef810c8b71853169a863'
  }

  /**
   * Transfer native currencies specifying the fee and amount as
   * separate.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * `fee` is the amount to be spent to pay for execution in destination
   * chain. Both fee and amount will be subtracted form the callers
   * balance.
   * 
   * If `fee` is not high enough to cover for the execution costs in the
   * destination chain, then the assets will be trapped in the
   * destination chain
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get asV2022(): {currencyId: v2022.CurrencyId, amount: bigint, fee: bigint, dest: v2022.VersionedMultiLocation, destWeight: bigint} {
    assert(this.isV2022)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Transfer native currencies specifying the fee and amount as
   * separate.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * `fee` is the amount to be spent to pay for execution in destination
   * chain. Both fee and amount will be subtracted form the callers
   * balance.
   * 
   * If `fee` is not high enough to cover for the execution costs in the
   * destination chain, then the assets will be trapped in the
   * destination chain
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get isV2042(): boolean {
    return this._chain.getCallHash('XTokens.transfer_with_fee') === 'd030d901b07080c7d5f055035ef9dccc1209804d1a753f6a413d816dfcfd141b'
  }

  /**
   * Transfer native currencies specifying the fee and amount as
   * separate.
   * 
   * `dest_weight` is the weight for XCM execution on the dest chain, and
   * it would be charged from the transferred assets. If set below
   * requirements, the execution may fail and assets wouldn't be
   * received.
   * 
   * `fee` is the amount to be spent to pay for execution in destination
   * chain. Both fee and amount will be subtracted form the callers
   * balance.
   * 
   * If `fee` is not high enough to cover for the execution costs in the
   * destination chain, then the assets will be trapped in the
   * destination chain
   * 
   * It's a no-op if any error on local XCM execution or message sending.
   * Note sending assets out per se doesn't guarantee they would be
   * received. Receiving depends on if the XCM message could be delivered
   * by the network, and if the receiving chain would handle
   * messages correctly.
   */
  get asV2042(): {currencyId: v2042.CurrencyId, amount: bigint, fee: bigint, dest: v2042.VersionedMultiLocation, destWeight: bigint} {
    assert(this.isV2042)
    return this._chain.decodeCall(this.call)
  }

  get isV2080(): boolean {
    return this._chain.getCallHash('XTokens.transfer_with_fee') === 'bcf150c29200cfb90b60305529f2a17fb6b75a07ba65b1bb604ecaef75f1ca59'
  }

  get asV2080(): {currencyId: v2080.CurrencyId, amount: bigint, fee: bigint, dest: v2080.VersionedMultiLocation, destWeight: bigint} {
    assert(this.isV2080)
    return this._chain.decodeCall(this.call)
  }
}
