import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v1020 from './v1020'
import * as v1050 from './v1050'
import * as v1058 from './v1058'
import * as v9010 from './v9010'
import * as v9111 from './v9111'
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
  get isV9010() {
    return this._chain.getStorageItemTypeHash('Crowdloan', 'Funds') === 'eb9089ef4c01c54f3287c4396bf755b671cecb8b45487320ccd4d35e3df76840'
  }

  /**
   *  Info on all of the funds.
   */
  async getAsV9010(key: v9010.ParaId): Promise<v9010.FundInfo | undefined> {
    assert(this.isV9010)
    return this._chain.getStorage(this.blockHash, 'Crowdloan', 'Funds', key)
  }

  async getManyAsV9010(keys: v9010.ParaId[]): Promise<(v9010.FundInfo | undefined)[]> {
    assert(this.isV9010)
    return this._chain.queryStorage(this.blockHash, 'Crowdloan', 'Funds', keys.map(k => [k]))
  }

  /**
   *  Info on all of the funds.
   */
  get isV9111() {
    return this._chain.getStorageItemTypeHash('Crowdloan', 'Funds') === '12ab1ac19ae156d5acf61b3bdb7d29a147b5793947baca0144497ee7e32553c2'
  }

  /**
   *  Info on all of the funds.
   */
  async getAsV9111(key: v9111.Id): Promise<v9111.FundInfo | undefined> {
    assert(this.isV9111)
    return this._chain.getStorage(this.blockHash, 'Crowdloan', 'Funds', key)
  }

  async getManyAsV9111(keys: v9111.Id[]): Promise<(v9111.FundInfo | undefined)[]> {
    assert(this.isV9111)
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
  async getAsV9180(key: v9180.Id): Promise<v9180.FundInfo | undefined> {
    assert(this.isV9180)
    return this._chain.getStorage(this.blockHash, 'Crowdloan', 'Funds', key)
  }

  async getManyAsV9180(keys: v9180.Id[]): Promise<(v9180.FundInfo | undefined)[]> {
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
  get isV1020() {
    return this._chain.getStorageItemTypeHash('Session', 'Validators') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  The current set of validators.
   */
  async getAsV1020(): Promise<v1020.ValidatorId[]> {
    assert(this.isV1020)
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
  get isV1050() {
    return this._chain.getStorageItemTypeHash('Staking', 'ActiveEra') === '2bb946dd9c19de9f4332897005d1255528c610172f7418fae165b5dafd3cfbfe'
  }

  /**
   *  The active era information, it holds index and start.
   * 
   *  The active era is the era currently rewarded.
   *  Validator set of this era must be equal to `SessionInterface::validators`.
   */
  async getAsV1050(): Promise<v1050.ActiveEraInfo | undefined> {
    assert(this.isV1050)
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
  get isV1020() {
    return this._chain.getStorageItemTypeHash('Staking', 'Bonded') === 'de3ac6d702494f77c04d74bab1d59ac44113746a3722fe8b7306730fb0fc740c'
  }

  /**
   *  Map from all locked "stash" accounts to the controller account.
   */
  async getAsV1020(key: v1020.AccountId): Promise<v1020.AccountId | undefined> {
    assert(this.isV1020)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Bonded', key)
  }

  async getManyAsV1020(keys: v1020.AccountId[]): Promise<(v1020.AccountId | undefined)[]> {
    assert(this.isV1020)
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
   */
  get isV1020() {
    return this._chain.getStorageItemTypeHash('Staking', 'CurrentEra') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The current era index.
   */
  async getAsV1020(): Promise<v1020.EraIndex> {
    assert(this.isV1020)
    return this._chain.getStorage(this.blockHash, 'Staking', 'CurrentEra')
  }

  /**
   *  The current era index.
   * 
   *  This is the latest planned era, depending on how session module queues the validator
   *  set, it might be active or not.
   */
  get isV1050() {
    return this._chain.getStorageItemTypeHash('Staking', 'CurrentEra') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  The current era index.
   * 
   *  This is the latest planned era, depending on how session module queues the validator
   *  set, it might be active or not.
   */
  async getAsV1050(): Promise<v1050.EraIndex | undefined> {
    assert(this.isV1050)
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
  get isV1050() {
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
  async getAsV1050(key1: v1050.EraIndex, key2: v1050.AccountId): Promise<v1050.Exposure> {
    assert(this.isV1050)
    return this._chain.getStorage(this.blockHash, 'Staking', 'ErasStakers', key1, key2)
  }

  async getManyAsV1050(keys: [v1050.EraIndex, v1050.AccountId][]): Promise<(v1050.Exposure)[]> {
    assert(this.isV1050)
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
  get isV1020() {
    return this._chain.getStorageItemTypeHash('Staking', 'Ledger') === 'c27b3ed6dad75f65e118399ee7274c494565332d8c67cc85aef297dd1092284b'
  }

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  async getAsV1020(key: v1020.AccountId): Promise<v1020.StakingLedger | undefined> {
    assert(this.isV1020)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Ledger', key)
  }

  async getManyAsV1020(keys: v1020.AccountId[]): Promise<(v1020.StakingLedger | undefined)[]> {
    assert(this.isV1020)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Ledger', keys.map(k => [k]))
  }

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  get isV1050() {
    return this._chain.getStorageItemTypeHash('Staking', 'Ledger') === 'acb0ae5b3ecc4c620a929a6d33a493f14d936906f24812ba68afe18beaf2314a'
  }

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  async getAsV1050(key: v1050.AccountId): Promise<v1050.StakingLedger | undefined> {
    assert(this.isV1050)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Ledger', key)
  }

  async getManyAsV1050(keys: v1050.AccountId[]): Promise<(v1050.StakingLedger | undefined)[]> {
    assert(this.isV1050)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Ledger', keys.map(k => [k]))
  }

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  get isV1058() {
    return this._chain.getStorageItemTypeHash('Staking', 'Ledger') === '838ac827cb2532f983c68467cfa97afcccf6147fb96e61e136394060880b64a4'
  }

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  async getAsV1058(key: v1058.AccountId): Promise<v1058.StakingLedger | undefined> {
    assert(this.isV1058)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Ledger', key)
  }

  async getManyAsV1058(keys: v1058.AccountId[]): Promise<(v1058.StakingLedger | undefined)[]> {
    assert(this.isV1058)
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
  get isV1020() {
    return this._chain.getStorageItemTypeHash('Staking', 'Payee') === '3d88af4306e38ea477ff9098e5cfc51177c77c5023d8403a57071d4f2a0cf0be'
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  async getAsV1020(key: v1020.AccountId): Promise<v1020.RewardDestination> {
    assert(this.isV1020)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Payee', key)
  }

  async getManyAsV1020(keys: v1020.AccountId[]): Promise<(v1020.RewardDestination)[]> {
    assert(this.isV1020)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Payee', keys.map(k => [k]))
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  get isV9111() {
    return this._chain.getStorageItemTypeHash('Staking', 'Payee') === '997acadf80b79903fb4386b933d481dff61dad22612d657f19f39b937ea8d992'
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   */
  async getAsV9111(key: v9111.AccountId32): Promise<v9111.RewardDestination> {
    assert(this.isV9111)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Payee', key)
  }

  async getManyAsV9111(keys: v9111.AccountId32[]): Promise<(v9111.RewardDestination)[]> {
    assert(this.isV9111)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Payee', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'Payee') != null
  }
}

export class StakingStakersStorage {
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
   *  Nominators for a particular account that is in action right now. You can't iterate
   *  through validators here, but you can find them in the Session module.
   * 
   *  This is keyed by the stash account.
   */
  get isV1020() {
    return this._chain.getStorageItemTypeHash('Staking', 'Stakers') === 'd3eee9271023eb9c766a48fd0a709136d59d1bde5407acf940037ad950c8900d'
  }

  /**
   *  Nominators for a particular account that is in action right now. You can't iterate
   *  through validators here, but you can find them in the Session module.
   * 
   *  This is keyed by the stash account.
   */
  async getAsV1020(key: v1020.AccountId): Promise<v1020.Exposure> {
    assert(this.isV1020)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Stakers', key)
  }

  async getManyAsV1020(keys: v1020.AccountId[]): Promise<(v1020.Exposure)[]> {
    assert(this.isV1020)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Stakers', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'Stakers') != null
  }
}
