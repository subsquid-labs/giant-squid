import assert from "assert"
import * as marshal from "./marshal"

export class Token {
  private _symbol!: string | undefined | null

  constructor(props?: Partial<Omit<Token, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._symbol = json.symbol == null ? undefined : marshal.string.fromJSON(json.symbol)
    }
  }

  get symbol(): string | undefined | null {
    return this._symbol
  }

  set symbol(value: string | undefined | null) {
    this._symbol = value
  }

  toJSON(): object {
    return {
      symbol: this.symbol,
    }
  }
}
