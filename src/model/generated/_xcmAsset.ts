import assert from "assert"
import * as marshal from "./marshal"

export class XcmAsset {
  private _amount!: bigint | undefined | null
  private _token!: string | undefined | null

  constructor(props?: Partial<Omit<XcmAsset, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._amount = json.amount == null ? undefined : marshal.bigint.fromJSON(json.amount)
      this._token = json.token == null ? undefined : marshal.string.fromJSON(json.token)
    }
  }

  get amount(): bigint | undefined | null {
    return this._amount
  }

  set amount(value: bigint | undefined | null) {
    this._amount = value
  }

  get token(): string | undefined | null {
    return this._token
  }

  set token(value: string | undefined | null) {
    this._token = value
  }

  toJSON(): object {
    return {
      amount: this.amount == null ? undefined : marshal.bigint.toJSON(this.amount),
      token: this.token,
    }
  }
}
