import assert from "assert"
import * as marshal from "./marshal"

export class TransferAssetToken {
  public readonly isTypeOf = 'TransferAssetToken'
  private _symbol!: string | undefined | null
  private _decimals!: number | undefined | null
  private _amount!: bigint | undefined | null

  constructor(props?: Partial<Omit<TransferAssetToken, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._symbol = json.symbol == null ? undefined : marshal.string.fromJSON(json.symbol)
      this._decimals = json.decimals == null ? undefined : marshal.int.fromJSON(json.decimals)
      this._amount = json.amount == null ? undefined : marshal.bigint.fromJSON(json.amount)
    }
  }

  get symbol(): string | undefined | null {
    return this._symbol
  }

  set symbol(value: string | undefined | null) {
    this._symbol = value
  }

  get decimals(): number | undefined | null {
    return this._decimals
  }

  set decimals(value: number | undefined | null) {
    this._decimals = value
  }

  get amount(): bigint | undefined | null {
    return this._amount
  }

  set amount(value: bigint | undefined | null) {
    this._amount = value
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      symbol: this.symbol,
      decimals: this.decimals,
      amount: this.amount == null ? undefined : marshal.bigint.toJSON(this.amount),
    }
  }
}
