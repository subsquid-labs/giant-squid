import assert from "assert"
import * as marshal from "./marshal"

export class XcmDestination {
  private _id!: string | undefined | null
  private _paraId!: number | undefined | null

  constructor(props?: Partial<Omit<XcmDestination, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._id = json.id == null ? undefined : marshal.string.fromJSON(json.id)
      this._paraId = json.paraId == null ? undefined : marshal.int.fromJSON(json.paraId)
    }
  }

  get id(): string | undefined | null {
    return this._id
  }

  set id(value: string | undefined | null) {
    this._id = value
  }

  get paraId(): number | undefined | null {
    return this._paraId
  }

  set paraId(value: number | undefined | null) {
    this._paraId = value
  }

  toJSON(): object {
    return {
      id: this.id,
      paraId: this.paraId,
    }
  }
}
