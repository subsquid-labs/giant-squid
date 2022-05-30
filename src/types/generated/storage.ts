import assert from 'assert'
import {StorageContext, Result} from './support'
import * as v12 from './v12'
import * as v4 from './v4'

export class DappsStakingLedgerStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Bonded amount for the staker
   */
  get isV4() {
    return this.ctx._chain.getStorageItemTypeHash('DappsStaking', 'Ledger') === '0bac40afaf72ceea5a87ae2baaa5fe7f69915323f3293bdd970e7790a9d968c0'
  }

  /**
   *  Bonded amount for the staker
   */
  async getAsV4(key: v4.AccountId32): Promise<bigint> {
    assert(this.isV4)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'DappsStaking', 'Ledger', key)
  }

  async getManyAsV4(keys: v4.AccountId32[]): Promise<(bigint)[]> {
    assert(this.isV4)
    return this.ctx._chain.queryStorage(this.ctx.block.hash, 'DappsStaking', 'Ledger', keys.map(k => [k]))
  }

  /**
   *  Bonded amount for the staker
   */
  get isV12() {
    return this.ctx._chain.getStorageItemTypeHash('DappsStaking', 'Ledger') === 'bf7d8454aaa894899341799a1668f8343ff6e16a3dd56efa4c51529fe4e772b9'
  }

  /**
   *  Bonded amount for the staker
   */
  async getAsV12(key: v12.AccountId32): Promise<v12.AccountLedger> {
    assert(this.isV12)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'DappsStaking', 'Ledger', key)
  }

  async getManyAsV12(keys: v12.AccountId32[]): Promise<(v12.AccountLedger)[]> {
    assert(this.isV12)
    return this.ctx._chain.queryStorage(this.ctx.block.hash, 'DappsStaking', 'Ledger', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('DappsStaking', 'Ledger') != null
  }
}
