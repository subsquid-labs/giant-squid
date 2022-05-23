import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v2032 from './v2032'
import * as v2040 from './v2040'

export class XTokensTransferredMultiAssetsEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'xTokens.TransferredMultiAssets')
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get isV2032(): boolean {
    return this.ctx._chain.getEventHash('xTokens.TransferredMultiAssets') === 'f7bab399e6ba944b4e125eae381fe361968f8e894d499e45a921bf53ae4632d8'
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get asV2032(): {sender: v2032.AccountId32, assets: v2032.V1MultiAssets, dest: v2032.V1MultiLocation} {
    assert(this.isV2032)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get isV2040(): boolean {
    return this.ctx._chain.getEventHash('xTokens.TransferredMultiAssets') === '19a61ff727b39e06bdac9248dc278a5be6292a6af670958a6338915a3e003249'
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get asV2040(): {sender: v2040.AccountId32, assets: v2040.V1MultiAssets, fee: v2040.V1MultiAsset, dest: v2040.V1MultiLocation} {
    assert(this.isV2040)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV2040
  }

  get asLatest(): {sender: v2040.AccountId32, assets: v2040.V1MultiAssets, fee: v2040.V1MultiAsset, dest: v2040.V1MultiLocation} {
    deprecateLatest()
    return this.asV2040
  }
}
