import assert from 'assert'
import {StorageContext, Result} from './support'
import * as v9110 from './v9110'

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
  async getAsV9110(key: v9110.Id): Promise<v9110.FundInfo> {
    assert(this.isV9110)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Crowdloan', 'Funds', key)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Crowdloan', 'Funds') != null
  }
}
