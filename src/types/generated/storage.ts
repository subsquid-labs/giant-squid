import assert from 'assert'
import {StorageContext, Result} from './support'
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

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('DappsStaking', 'Ledger') != null
  }
}
