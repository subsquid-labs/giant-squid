import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {TransferLocation, fromJsonTransferLocation} from "./_transferLocation"
import {TransferAsset, fromJsonTransferAsset} from "./_transferAsset"
import {TransferType} from "./_transferType"

@Entity_()
export class Transfer {
  constructor(props?: Partial<Transfer>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("timestamp with time zone", {nullable: true})
  timestamp!: Date | undefined | null

  @Index_()
  @Column_("int4", {nullable: true})
  blockNumber!: number | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  extrinsicHash!: string | undefined | null

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : fromJsonTransferLocation(obj)}, nullable: true})
  to!: TransferLocation | undefined | null

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : fromJsonTransferLocation(obj)}, nullable: true})
  from!: TransferLocation | undefined | null

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : fromJsonTransferAsset(obj)}, nullable: true})
  asset!: TransferAsset | undefined | null

  @Index_()
  @Column_("bool", {nullable: true})
  success!: boolean | undefined | null

  @Column_("varchar", {length: 12, nullable: true})
  type!: TransferType | undefined | null
}
