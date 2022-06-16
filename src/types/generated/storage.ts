import assert from 'assert'
import {StorageContext, Result} from './support'
import * as v0 from './v0'
import * as v9110 from './v9110'
import * as v9180 from './v9180'

export class CrowdloanFundsStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Info on all of the funds.
   */
  get isV9110() {
    return this.ctx._chain.getStorageItemTypeHash('Crowdloan', 'Funds') === '12ab1ac19ae156d5acf61b3bdb7d29a147b5793947baca0144497ee7e32553c2'
  }

  /**
   *  Info on all of the funds.
   */
  async getAsV9110(key: v9110.Id): Promise<v9110.FundInfo | undefined> {
    assert(this.isV9110)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Crowdloan', 'Funds', key)
  }

  async getManyAsV9110(keys: v9110.Id[]): Promise<(v9110.FundInfo | undefined)[]> {
    assert(this.isV9110)
    return this.ctx._chain.queryStorage(this.ctx.block.hash, 'Crowdloan', 'Funds', keys.map(k => [k]))
  }

  /**
   *  Info on all of the funds.
   */
  get isV9180() {
    return this.ctx._chain.getStorageItemTypeHash('Crowdloan', 'Funds') === 'e837aa8c7af80bff126d455e0237189b2b62b5bf6586a1f2e67a22edfaf5a596'
  }

  /**
   *  Info on all of the funds.
   */
  async getAsV9180(key: v9180.Id): Promise<v9180.FundInfo | undefined> {
    assert(this.isV9180)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Crowdloan', 'Funds', key)
  }

  async getManyAsV9180(keys: v9180.Id[]): Promise<(v9180.FundInfo | undefined)[]> {
    assert(this.isV9180)
    return this.ctx._chain.queryStorage(this.ctx.block.hash, 'Crowdloan', 'Funds', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Crowdloan', 'Funds') != null
  }
}

export class SessionValidatorsStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  The current set of validators.
   */
  get isV0() {
    return this.ctx._chain.getStorageItemTypeHash('Session', 'Validators') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  The current set of validators.
   */
  async getAsV0(): Promise<v0.ValidatorId[]> {
    assert(this.isV0)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Session', 'Validators')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Session', 'Validators') != null
  }
}

export class StakingActiveEraStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  The active era information, it holds index and start.
   * 
   *  The active era is the era currently rewarded.
   *  Validator set of this era must be equal to `SessionInterface::validators`.
   */
  get isV0() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'ActiveEra') === '2bb946dd9c19de9f4332897005d1255528c610172f7418fae165b5dafd3cfbfe'
  }

  /**
   *  The active era information, it holds index and start.
   * 
   *  The active era is the era currently rewarded.
   *  Validator set of this era must be equal to `SessionInterface::validators`.
   */
  async getAsV0(): Promise<v0.ActiveEraInfo | undefined> {
    assert(this.isV0)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'ActiveEra')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'ActiveEra') != null
  }
}

export class StakingBondedStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Map from all locked "stash" accounts to the controller account.
   */
  get isV0() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Bonded') === 'de3ac6d702494f77c04d74bab1d59ac44113746a3722fe8b7306730fb0fc740c'
  }

  /**
   *  Map from all locked "stash" accounts to the controller account.
   */
  async getAsV0(key: v0.AccountId): Promise<v0.AccountId | undefined> {
    assert(this.isV0)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'Bonded', key)
  }

  async getManyAsV0(keys: v0.AccountId[]): Promise<(v0.AccountId | undefined)[]> {
    assert(this.isV0)
    return this.ctx._chain.queryStorage(this.ctx.block.hash, 'Staking', 'Bonded', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Bonded') != null
  }
}

export class StakingCurrentEraStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  The current era index.
   * 
   *  This is the latest planned era, depending on how the Session pallet queues the validator
   *  set, it might be active or not.
   */
  get isV0() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'CurrentEra') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  The current era index.
   * 
   *  This is the latest planned era, depending on how the Session pallet queues the validator
   *  set, it might be active or not.
   */
  async getAsV0(): Promise<v0.EraIndex | undefined> {
    assert(this.isV0)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'CurrentEra')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'CurrentEra') != null
  }
}

export class StakingErasStakersStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Exposure of validator at era.
   * 
   *  This is keyed first by the era index to allow bulk deletion and then the stash account.
   * 
   *  Is it removed after `HISTORY_DEPTH` eras.
   *  If stakers hasn't been set or has been removed then empty exposure is returned.
   */
  get isV0() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'ErasStakers') === 'f3f726cc814cef290657008054cd10667b250a01d2842ff3bbbcca24c98abf5b'
  }

  /**
   *  Exposure of validator at era.
   * 
   *  This is keyed first by the era index to allow bulk deletion and then the stash account.
   * 
   *  Is it removed after `HISTORY_DEPTH` eras.
   *  If stakers hasn't been set or has been removed then empty exposure is returned.
   */
  async getAsV0(key1: v0.EraIndex, key2: v0.AccountId): Promise<v0.Exposure> {
    assert(this.isV0)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'ErasStakers', key1, key2)
  }

  async getManyAsV0(keys: [v0.EraIndex, v0.AccountId][]): Promise<(v0.Exposure)[]> {
    assert(this.isV0)
    return this.ctx._chain.queryStorage(this.ctx.block.hash, 'Staking', 'ErasStakers', keys)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'ErasStakers') != null
  }
}

export class StakingLedgerStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  get isV0() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Ledger') === '838ac827cb2532f983c68467cfa97afcccf6147fb96e61e136394060880b64a4'
  }

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  async getAsV0(key: v0.AccountId): Promise<v0.StakingLedger | undefined> {
    assert(this.isV0)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'Ledger', key)
  }

  async getManyAsV0(keys: v0.AccountId[]): Promise<(v0.StakingLedger | undefined)[]> {
    assert(this.isV0)
    return this.ctx._chain.queryStorage(this.ctx.block.hash, 'Staking', 'Ledger', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Ledger') != null
  }
}

export class StakingPayeeStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  get isV0() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Payee') === '3d88af4306e38ea477ff9098e5cfc51177c77c5023d8403a57071d4f2a0cf0be'
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  async getAsV0(key: v0.AccountId): Promise<v0.RewardDestination> {
    assert(this.isV0)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'Payee', key)
  }

  async getManyAsV0(keys: v0.AccountId[]): Promise<(v0.RewardDestination)[]> {
    assert(this.isV0)
    return this.ctx._chain.queryStorage(this.ctx.block.hash, 'Staking', 'Payee', keys.map(k => [k]))
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  get isV9110() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Payee') === '997acadf80b79903fb4386b933d481dff61dad22612d657f19f39b937ea8d992'
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  async getAsV9110(key: v9110.AccountId32): Promise<v9110.RewardDestination> {
    assert(this.isV9110)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'Payee', key)
  }

  async getManyAsV9110(keys: v9110.AccountId32[]): Promise<(v9110.RewardDestination)[]> {
    assert(this.isV9110)
    return this.ctx._chain.queryStorage(this.ctx.block.hash, 'Staking', 'Payee', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Payee') != null
  }
}
