import assert from 'assert'
import {StorageContext, Result} from './support'
import * as v1020 from './v1020'
import * as v1050 from './v1050'
import * as v1058 from './v1058'
import * as v9010 from './v9010'
import * as v9111 from './v9111'
import * as v9180 from './v9180'

export class CrowdloanFundsStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Info on all of the funds.
   */
  get isV9010() {
    return this.ctx._chain.getStorageItemTypeHash('Crowdloan', 'Funds') === 'eb9089ef4c01c54f3287c4396bf755b671cecb8b45487320ccd4d35e3df76840'
  }

  /**
   *  Info on all of the funds.
   */
  async getAsV9010(key: number): Promise<v9010.FundInfo | undefined> {
    assert(this.isV9010)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Crowdloan', 'Funds', key)
  }

  /**
   *  Info on all of the funds.
   */
  get isV9111() {
    return this.ctx._chain.getStorageItemTypeHash('Crowdloan', 'Funds') === '12ab1ac19ae156d5acf61b3bdb7d29a147b5793947baca0144497ee7e32553c2'
  }

  /**
   *  Info on all of the funds.
   */
  async getAsV9111(key: v9111.Id): Promise<v9111.FundInfo | undefined> {
    assert(this.isV9111)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Crowdloan', 'Funds', key)
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

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Crowdloan', 'Funds') != null
  }
}

export class StakingBondedStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Map from all locked "stash" accounts to the controller account.
   */
  get isV1020() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Bonded') === 'de3ac6d702494f77c04d74bab1d59ac44113746a3722fe8b7306730fb0fc740c'
  }

  /**
   *  Map from all locked "stash" accounts to the controller account.
   */
  async getAsV1020(key: Uint8Array): Promise<Uint8Array | undefined> {
    assert(this.isV1020)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'Bonded', key)
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
   */
  get isV1020() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'CurrentEra') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The current era index.
   */
  async getAsV1020(): Promise<number> {
    assert(this.isV1020)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'CurrentEra')
  }

  /**
   *  The current era index.
   * 
   *  This is the latest planned era, depending on how session module queues the validator
   *  set, it might be active or not.
   */
  get isV1050() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'CurrentEra') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  The current era index.
   * 
   *  This is the latest planned era, depending on how session module queues the validator
   *  set, it might be active or not.
   */
  async getAsV1050(): Promise<number | undefined> {
    assert(this.isV1050)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'CurrentEra')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'CurrentEra') != null
  }
}

export class StakingLedgerStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  get isV1020() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Ledger') === 'c27b3ed6dad75f65e118399ee7274c494565332d8c67cc85aef297dd1092284b'
  }

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  async getAsV1020(key: Uint8Array): Promise<v1020.StakingLedgerTo223 | undefined> {
    assert(this.isV1020)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'Ledger', key)
  }

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  get isV1050() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Ledger') === 'acb0ae5b3ecc4c620a929a6d33a493f14d936906f24812ba68afe18beaf2314a'
  }

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  async getAsV1050(key: Uint8Array): Promise<v1050.StakingLedgerTo240 | undefined> {
    assert(this.isV1050)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'Ledger', key)
  }

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  get isV1058() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Ledger') === '838ac827cb2532f983c68467cfa97afcccf6147fb96e61e136394060880b64a4'
  }

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  async getAsV1058(key: Uint8Array): Promise<v1058.StakingLedger | undefined> {
    assert(this.isV1058)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'Ledger', key)
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
  get isV1020() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Payee') === '3d88af4306e38ea477ff9098e5cfc51177c77c5023d8403a57071d4f2a0cf0be'
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  async getAsV1020(key: Uint8Array): Promise<v1020.RewardDestination> {
    assert(this.isV1020)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'Payee', key)
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  get isV9111() {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Payee') === '997acadf80b79903fb4386b933d481dff61dad22612d657f19f39b937ea8d992'
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  async getAsV9111(key: v9111.AccountId32): Promise<v9111.RewardDestination> {
    assert(this.isV9111)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Staking', 'Payee', key)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Staking', 'Payee') != null
  }
}
