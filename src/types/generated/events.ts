import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v2000 from './v2000'
import * as v2011 from './v2011'
import * as v2020 from './v2020'
import * as v2022 from './v2022'
import * as v2032 from './v2032'
import * as v2040 from './v2040'
import * as v2042 from './v2042'

export class CurrenciesTransferredEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'currencies.Transferred')
  }

  /**
   * Currency transfer success. \[currency_id, from, to, amount\]
   */
  get isV2000(): boolean {
    return this.ctx._chain.getEventHash('currencies.Transferred') === 'facde188db2a44338ba6dd75ada7e7c3bbabf9f2401193c298b509a536675e5e'
  }

  /**
   * Currency transfer success. \[currency_id, from, to, amount\]
   */
  get asV2000(): [v2000.CurrencyId, v2000.AccountId32, v2000.AccountId32, bigint] {
    assert(this.isV2000)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Currency transfer success. \[currency_id, from, to, amount\]
   */
  get isV2011(): boolean {
    return this.ctx._chain.getEventHash('currencies.Transferred') === 'b9198106a2b5af4321399a190833e2d1b6bd1c34ae18a490064974c55b54f6f1'
  }

  /**
   * Currency transfer success. \[currency_id, from, to, amount\]
   */
  get asV2011(): [v2011.CurrencyId, v2011.AccountId32, v2011.AccountId32, bigint] {
    assert(this.isV2011)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Currency transfer success.
   */
  get isV2020(): boolean {
    return this.ctx._chain.getEventHash('currencies.Transferred') === '34623a78397ce056cab141f961957813cdfcf009994ece8c58a1618f31139527'
  }

  /**
   * Currency transfer success.
   */
  get asV2020(): {currencyId: v2020.CurrencyId, from: v2020.AccountId32, to: v2020.AccountId32, amount: bigint} {
    assert(this.isV2020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Currency transfer success.
   */
  get isV2022(): boolean {
    return this.ctx._chain.getEventHash('currencies.Transferred') === '192ab8941a095e19253a7ae4592ba3869251151917797a89f36d9dd3239ec6fc'
  }

  /**
   * Currency transfer success.
   */
  get asV2022(): {currencyId: v2022.CurrencyId, from: v2022.AccountId32, to: v2022.AccountId32, amount: bigint} {
    assert(this.isV2022)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Currency transfer success.
   */
  get isV2042(): boolean {
    return this.ctx._chain.getEventHash('currencies.Transferred') === '49ad966124f80b30969cb8c3379197b442e52b36414bea6c504c8549f31e9b87'
  }

  /**
   * Currency transfer success.
   */
  get asV2042(): {currencyId: v2042.CurrencyId, from: v2042.AccountId32, to: v2042.AccountId32, amount: bigint} {
    assert(this.isV2042)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV2042
  }

  get asLatest(): {currencyId: v2042.CurrencyId, from: v2042.AccountId32, to: v2042.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV2042
  }
}

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
