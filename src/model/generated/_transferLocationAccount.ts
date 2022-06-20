import assert from "assert"
import * as marshal from "./marshal"

export class TransferLocationAccount {
  public readonly isTypeOf = 'TransferLocationAccount'
  private _id!: string | undefined | null

  constructor(props?: Partial<Omit<TransferLocationAccount, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._id = json.id == null ? undefined : marshal.string.fromJSON(json.id)
    }
  }

  get id(): string | undefined | null {
    return this._id
  }

  set id(value: string | undefined | null) {
    this._id = value
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      id: this.id,
    }
  }
}
