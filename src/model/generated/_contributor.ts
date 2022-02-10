import assert from "assert"
import * as marshal from "./marshal"

export class Contributor {
  private _id!: string
  private _amount!: bigint

  constructor(props?: Partial<Omit<Contributor, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._id = marshal.id.fromJSON(json.id)
      this._amount = marshal.bigint.fromJSON(json.amount)
    }
  }

  get id(): string {
    assert(this._id != null, 'uninitialized access')
    return this._id
  }

  set id(value: string) {
    this._id = value
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
      id: this.id,
      amount: marshal.bigint.toJSON(this.amount),
    }
  }
}
