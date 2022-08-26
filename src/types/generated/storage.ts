import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v0 from './v0'
import * as v9110 from './v9110'
import * as v9180 from './v9180'

export class CrowdloanFundsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Info on all of the funds.
   */
  get isV9110() {
    return this._chain.getStorageItemTypeHash('Crowdloan', 'Funds') === '12ab1ac19ae156d5acf61b3bdb7d29a147b5793947baca0144497ee7e32553c2'
  }

  /**
   *  Info on all of the funds.
   */
  async getAsV9110(key: number): Promise<v9110.FundInfo | undefined> {
    assert(this.isV9110)
    return this._chain.getStorage(this.blockHash, 'Crowdloan', 'Funds', key)
  }

  async getManyAsV9110(keys: number[]): Promise<(v9110.FundInfo | undefined)[]> {
    assert(this.isV9110)
    return this._chain.queryStorage(this.blockHash, 'Crowdloan', 'Funds', keys.map(k => [k]))
  }

  /**
   *  Info on all of the funds.
   */
  get isV9180() {
    return this._chain.getStorageItemTypeHash('Crowdloan', 'Funds') === 'e837aa8c7af80bff126d455e0237189b2b62b5bf6586a1f2e67a22edfaf5a596'
  }

  /**
   *  Info on all of the funds.
   */
  async getAsV9180(key: number): Promise<v9180.FundInfo | undefined> {
    assert(this.isV9180)
    return this._chain.getStorage(this.blockHash, 'Crowdloan', 'Funds', key)
  }

  async getManyAsV9180(keys: number[]): Promise<(v9180.FundInfo | undefined)[]> {
    assert(this.isV9180)
    return this._chain.queryStorage(this.blockHash, 'Crowdloan', 'Funds', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Crowdloan', 'Funds') != null
  }
}

export class SessionValidatorsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The current set of validators.
   */
  get isV0() {
    return this._chain.getStorageItemTypeHash('Session', 'Validators') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  The current set of validators.
   */
  async getAsV0(): Promise<Uint8Array[]> {
    assert(this.isV0)
    return this._chain.getStorage(this.blockHash, 'Session', 'Validators')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'Validators') != null
  }
}

export class StakingActiveEraStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The active era information, it holds index and start.
   * 
   *  The active era is the era currently rewarded.
   *  Validator set of this era must be equal to `SessionInterface::validators`.
   */
  get isV0() {
    return this._chain.getStorageItemTypeHash('Staking', 'ActiveEra') === '2bb946dd9c19de9f4332897005d1255528c610172f7418fae165b5dafd3cfbfe'
  }

  /**
   *  The active era information, it holds index and start.
   * 
   *  The active era is the era currently rewarded.
   *  Validator set of this era must be equal to `SessionInterface::validators`.
   */
  async getAsV0(): Promise<v0.ActiveEraInfo | undefined> {
    assert(this.isV0)
    return this._chain.getStorage(this.blockHash, 'Staking', 'ActiveEra')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'ActiveEra') != null
  }
}

export class StakingBondedStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Map from all locked "stash" accounts to the controller account.
   */
  get isV0() {
    return this._chain.getStorageItemTypeHash('Staking', 'Bonded') === 'de3ac6d702494f77c04d74bab1d59ac44113746a3722fe8b7306730fb0fc740c'
  }

  /**
   *  Map from all locked "stash" accounts to the controller account.
   */
  async getAsV0(key: Uint8Array): Promise<Uint8Array | undefined> {
    assert(this.isV0)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Bonded', key)
  }

  async getManyAsV0(keys: Uint8Array[]): Promise<(Uint8Array | undefined)[]> {
    assert(this.isV0)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Bonded', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'Bonded') != null
  }
}

export class StakingCurrentEraStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The current era index.
   * 
   *  This is the latest planned era, depending on how the Session pallet queues the validator
   *  set, it might be active or not.
   */
  get isV0() {
    return this._chain.getStorageItemTypeHash('Staking', 'CurrentEra') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  The current era index.
   * 
   *  This is the latest planned era, depending on how the Session pallet queues the validator
   *  set, it might be active or not.
   */
  async getAsV0(): Promise<number | undefined> {
    assert(this.isV0)
    return this._chain.getStorage(this.blockHash, 'Staking', 'CurrentEra')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'CurrentEra') != null
  }
}

export class StakingErasStakersStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Exposure of validator at era.
   * 
   *  This is keyed first by the era index to allow bulk deletion and then the stash account.
   * 
   *  Is it removed after `HISTORY_DEPTH` eras.
   *  If stakers hasn't been set or has been removed then empty exposure is returned.
   */
  get isV0() {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasStakers') === 'f3f726cc814cef290657008054cd10667b250a01d2842ff3bbbcca24c98abf5b'
  }

  /**
   *  Exposure of validator at era.
   * 
   *  This is keyed first by the era index to allow bulk deletion and then the stash account.
   * 
   *  Is it removed after `HISTORY_DEPTH` eras.
   *  If stakers hasn't been set or has been removed then empty exposure is returned.
   */
  async getAsV0(key1: number, key2: Uint8Array): Promise<v0.Exposure> {
    assert(this.isV0)
    return this._chain.getStorage(this.blockHash, 'Staking', 'ErasStakers', key1, key2)
  }

  async getManyAsV0(keys: [number, Uint8Array][]): Promise<(v0.Exposure)[]> {
    assert(this.isV0)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ErasStakers', keys)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasStakers') != null
  }
}

export class StakingLedgerStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  get isV0() {
    return this._chain.getStorageItemTypeHash('Staking', 'Ledger') === '838ac827cb2532f983c68467cfa97afcccf6147fb96e61e136394060880b64a4'
  }

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  async getAsV0(key: Uint8Array): Promise<v0.StakingLedger | undefined> {
    assert(this.isV0)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Ledger', key)
  }

  async getManyAsV0(keys: Uint8Array[]): Promise<(v0.StakingLedger | undefined)[]> {
    assert(this.isV0)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Ledger', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'Ledger') != null
  }
}

export class StakingPayeeStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  get isV0() {
    return this._chain.getStorageItemTypeHash('Staking', 'Payee') === '3d88af4306e38ea477ff9098e5cfc51177c77c5023d8403a57071d4f2a0cf0be'
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  async getAsV0(key: Uint8Array): Promise<v0.RewardDestination> {
    assert(this.isV0)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Payee', key)
  }

  async getManyAsV0(keys: Uint8Array[]): Promise<(v0.RewardDestination)[]> {
    assert(this.isV0)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Payee', keys.map(k => [k]))
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  get isV9110() {
    return this._chain.getStorageItemTypeHash('Staking', 'Payee') === '997acadf80b79903fb4386b933d481dff61dad22612d657f19f39b937ea8d992'
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  async getAsV9110(key: Uint8Array): Promise<v9110.RewardDestination> {
    assert(this.isV9110)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Payee', key)
  }

  async getManyAsV9110(keys: Uint8Array[]): Promise<(v9110.RewardDestination)[]> {
    assert(this.isV9110)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Payee', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'Payee') != null
  }
}
