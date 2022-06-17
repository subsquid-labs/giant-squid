import assert from 'assert'
import {StorageContext, Result} from './support'
import * as v13 from './v13'
import * as v29 from './v29'

export class SessionValidatorsStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  The current set of validators.
   */
  get isV13() {
    return this.ctx._chain.getStorageItemTypeHash('Session', 'Validators') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  The current set of validators.
   */
  async getAsV13(): Promise<v13.ValidatorId[]> {
    assert(this.isV13)
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
   *  The active era is the era being currently rewarded. Validator set of this era must be
   *  equal to [`SessionInterface::validators`].
   */
  get isV13() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'ActiveEra') === '2bb946dd9c19de9f4332897005d1255528c610172f7418fae165b5dafd3cfbfe'
  }

  /**
   *  The active era information, it holds index and start.
   * 
   *  The active era is the era being currently rewarded. Validator set of this era must be
   *  equal to [`SessionInterface::validators`].
   */
  async getAsV13(): Promise<v13.ActiveEraInfo | undefined> {
    assert(this.isV13)
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
  get isV13() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Bonded') === 'de3ac6d702494f77c04d74bab1d59ac44113746a3722fe8b7306730fb0fc740c'
  }

  /**
   *  Map from all locked "stash" accounts to the controller account.
   */
  async getAsV13(key: v13.AccountId): Promise<v13.AccountId | undefined> {
    assert(this.isV13)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'Bonded', key)
  }

  async getManyAsV13(keys: v13.AccountId[]): Promise<(v13.AccountId | undefined)[]> {
    assert(this.isV13)
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
  get isV13() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'CurrentEra') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  The current era index.
   * 
   *  This is the latest planned era, depending on how the Session pallet queues the validator
   *  set, it might be active or not.
   */
  async getAsV13(): Promise<v13.EraIndex | undefined> {
    assert(this.isV13)
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
  get isV13() {
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
  async getAsV13(key1: v13.EraIndex, key2: v13.AccountId): Promise<v13.Exposure> {
    assert(this.isV13)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'ErasStakers', key1, key2)
  }

  async getManyAsV13(keys: [v13.EraIndex, v13.AccountId][]): Promise<(v13.Exposure)[]> {
    assert(this.isV13)
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
  get isV13() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Ledger') === '838ac827cb2532f983c68467cfa97afcccf6147fb96e61e136394060880b64a4'
  }

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  async getAsV13(key: v13.AccountId): Promise<v13.StakingLedger | undefined> {
    assert(this.isV13)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'Ledger', key)
  }

  async getManyAsV13(keys: v13.AccountId[]): Promise<(v13.StakingLedger | undefined)[]> {
    assert(this.isV13)
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
  get isV13() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Payee') === '3d88af4306e38ea477ff9098e5cfc51177c77c5023d8403a57071d4f2a0cf0be'
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  async getAsV13(key: v13.AccountId): Promise<v13.RewardDestination> {
    assert(this.isV13)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'Payee', key)
  }

  async getManyAsV13(keys: v13.AccountId[]): Promise<(v13.RewardDestination)[]> {
    assert(this.isV13)
    return this.ctx._chain.queryStorage(this.ctx.block.hash, 'Staking', 'Payee', keys.map(k => [k]))
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  get isV29() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Payee') === '997acadf80b79903fb4386b933d481dff61dad22612d657f19f39b937ea8d992'
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  async getAsV29(key: v29.AccountId32): Promise<v29.RewardDestination> {
    assert(this.isV29)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'Payee', key)
  }

  async getManyAsV29(keys: v29.AccountId32[]): Promise<(v29.RewardDestination)[]> {
    assert(this.isV29)
    return this.ctx._chain.queryStorage(this.ctx.block.hash, 'Staking', 'Payee', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Payee') != null
  }
}
