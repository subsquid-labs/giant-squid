import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {XcmDestinationAccount} from "./_xcmDestinationAccount"
import {XcmAsset} from "./_xcmAsset"

@Entity_()
export class XcmTransfer {
  constructor(props?: Partial<XcmTransfer>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("timestamp with time zone", {nullable: true})
  date!: Date | undefined | null

  @Index_()
  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  blockNumber!: bigint | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  extrinsicHash!: string | undefined | null

  @Index_()
  @ManyToOne_(() => Account, {nullable: false})
  from!: Account

  @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => new XcmDestinationAccount(undefined, marshal.nonNull(obj))}, nullable: false})
  to!: XcmDestinationAccount

  @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => new XcmAsset(undefined, marshal.nonNull(obj))}, nullable: false})
  asset!: XcmAsset
}
