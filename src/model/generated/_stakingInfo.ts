import assert from "assert"
import * as marshal from "./marshal"

export class StakingInfo {
  private _payee!: string | undefined | null
  private _payeeAccount!: string | undefined | null
  private _controller!: string | undefined | null

  constructor(props?: Partial<Omit<StakingInfo, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._payee = json.payee == null ? undefined : marshal.string.fromJSON(json.payee)
      this._payeeAccount = json.payeeAccount == null ? undefined : marshal.string.fromJSON(json.payeeAccount)
      this._controller = json.controller == null ? undefined : marshal.string.fromJSON(json.controller)
    }
  }

  get payee(): string | undefined | null {
    return this._payee
  }

  set payee(value: string | undefined | null) {
    this._payee = value
  }

  get payeeAccount(): string | undefined | null {
    return this._payeeAccount
  }

  set payeeAccount(value: string | undefined | null) {
    this._payeeAccount = value
  }

  get controller(): string | undefined | null {
    return this._controller
  }

  set controller(value: string | undefined | null) {
    this._controller = value
  }

  toJSON(): object {
    return {
      payee: this.payee,
      payeeAccount: this.payeeAccount,
      controller: this.controller,
    }
  }
}
