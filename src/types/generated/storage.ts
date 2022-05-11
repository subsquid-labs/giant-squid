import assert from 'assert'
import {StorageContext, Result} from './support'
import * as v1001 from './v1001'
import * as v1201 from './v1201'

export class ParachainStakingBottomDelegationsStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Bottom delegations for collator candidate
   */
  get isV1201() {
    return this.ctx._chain.getStorageItemTypeHash('ParachainStaking', 'BottomDelegations') === 'e681b7cbb9992622456e4ee66d20daa7968a64b6a52ef599f5992850855cc3ee'
  }

  /**
   *  Bottom delegations for collator candidate
   */
  async getAsV1201(key: v1201.AccountId20): Promise<v1201.Delegations_209 | undefined> {
    assert(this.isV1201)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'ParachainStaking', 'BottomDelegations', key)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('ParachainStaking', 'BottomDelegations') != null
  }
}

export class ParachainStakingCandidateInfoStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Get collator candidate info associated with an account if account is candidate else None
   */
  get isV1201() {
    return this.ctx._chain.getStorageItemTypeHash('ParachainStaking', 'CandidateInfo') === '248231639cd86f1a3ffea0da2b9ed3fc64e1b7784d3759f68d733ac1ef08db19'
  }

  /**
   *  Get collator candidate info associated with an account if account is candidate else None
   */
  async getAsV1201(key: v1201.AccountId20): Promise<v1201.CandidateMetadata | undefined> {
    assert(this.isV1201)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'ParachainStaking', 'CandidateInfo', key)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('ParachainStaking', 'CandidateInfo') != null
  }
}

export class ParachainStakingCandidateStateStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Get collator candidate state associated with an account if account is a candidate else None
   */
  get isV1001() {
    return this.ctx._chain.getStorageItemTypeHash('ParachainStaking', 'CandidateState') === '84ab01b9f5d971571bb4cd8288174dc552c917250ba2c5256263959a40438f09'
  }

  /**
   *  Get collator candidate state associated with an account if account is a candidate else None
   */
  async getAsV1001(key: v1001.AccountId20): Promise<v1001.CollatorCandidate | undefined> {
    assert(this.isV1001)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'ParachainStaking', 'CandidateState', key)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('ParachainStaking', 'CandidateState') != null
  }
}

export class ParachainStakingDelegatorStateStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Get delegator state associated with an account if account is delegating else None
   */
  get isV1001() {
    return this.ctx._chain.getStorageItemTypeHash('ParachainStaking', 'DelegatorState') === '03dfb3b8e1ca16deb35d7040cc81f72b135e75c4caeea578cfc2294e1f1f41ad'
  }

  /**
   *  Get delegator state associated with an account if account is delegating else None
   */
  async getAsV1001(key: v1001.AccountId20): Promise<v1001.Delegator | undefined> {
    assert(this.isV1001)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'ParachainStaking', 'DelegatorState', key)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('ParachainStaking', 'DelegatorState') != null
  }
}

export class ParachainStakingTopDelegationsStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Top delegations for collator candidate
   */
  get isV1201() {
    return this.ctx._chain.getStorageItemTypeHash('ParachainStaking', 'TopDelegations') === 'e681b7cbb9992622456e4ee66d20daa7968a64b6a52ef599f5992850855cc3ee'
  }

  /**
   *  Top delegations for collator candidate
   */
  async getAsV1201(key: v1201.AccountId20): Promise<v1201.Delegations_209 | undefined> {
    assert(this.isV1201)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'ParachainStaking', 'TopDelegations', key)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('ParachainStaking', 'TopDelegations') != null
  }
}
