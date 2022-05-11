import assert from 'assert'
import {StorageContext, Result} from './support'
import * as v1001 from './v1001'
import * as v1201 from './v1201'
import * as v900 from './v900'

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

export class ParachainStakingCollatorState2Storage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Get collator state associated with an account if account is collating else None
   */
  get isV900() {
    return this.ctx._chain.getStorageItemTypeHash('ParachainStaking', 'CollatorState2') === 'a4d9c3541b410bd0ebf9e6919cad26ad7aa3481dd09c1495650af46ea30787a9'
  }

  /**
   *  Get collator state associated with an account if account is collating else None
   */
  async getAsV900(key: v900.H160): Promise<v900.Collator2 | undefined> {
    assert(this.isV900)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'ParachainStaking', 'CollatorState2', key)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('ParachainStaking', 'CollatorState2') != null
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

export class ParachainStakingNominatorState2Storage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Get nominator state associated with an account if account is nominating else None
   */
  get isV900() {
    return this.ctx._chain.getStorageItemTypeHash('ParachainStaking', 'NominatorState2') === 'adc9b2765bcd5aa9c2ac9f93cd108b87d508a8d5494c318bf18ee6f4b599b8ed'
  }

  /**
   *  Get nominator state associated with an account if account is nominating else None
   */
  async getAsV900(key: v900.H160): Promise<v900.Nominator2 | undefined> {
    assert(this.isV900)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'ParachainStaking', 'NominatorState2', key)
  }

  /**
   *  DEPRECATED in favor of DelegatorState
   *  Get nominator state associated with an account if account is nominating else None
   */
  get isV1001() {
    return this.ctx._chain.getStorageItemTypeHash('ParachainStaking', 'NominatorState2') === 'c33bf4fdf125c8070ffd27253f9a811a9a2b244a0af652bf531999872325e904'
  }

  /**
   *  DEPRECATED in favor of DelegatorState
   *  Get nominator state associated with an account if account is nominating else None
   */
  async getAsV1001(key: v1001.AccountId20): Promise<v1001.Nominator2 | undefined> {
    assert(this.isV1001)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'ParachainStaking', 'NominatorState2', key)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('ParachainStaking', 'NominatorState2') != null
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
