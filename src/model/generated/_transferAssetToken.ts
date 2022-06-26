import assert from "assert"
import * as marshal from "./marshal"

export class TransferAssetToken {
  public readonly isTypeOf = 'TransferAssetToken'
  private _symbol!: string
  private _amount!: bigint

  constructor(props?: Partial<Omit<TransferAssetToken, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._symbol = marshal.string.fromJSON(json.symbol)
      this._amount = marshal.bigint.fromJSON(json.amount)
    }
  }

  get symbol(): string {
    assert(this._symbol != null, 'uninitialized access')
    return this._symbol
  }

  set symbol(value: string) {
    this._symbol = value
  }

  get amount(): bigint {
    assert(this._amount != null, 'uninitialized access')
    return this._amount
  }

  set amount(value: bigint) {
    this._amount = value
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      symbol: this.symbol,
      amount: marshal.bigint.toJSON(this.amount),
    }
  }
}
