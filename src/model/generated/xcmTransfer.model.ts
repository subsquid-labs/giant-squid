import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {XcmDestination} from "./_xcmDestination"
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

  @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => new XcmDestination(undefined, marshal.nonNull(obj))}, nullable: false})
  to!: XcmDestination

  @Column_("jsonb", {transformer: {to: obj => obj.map((val: any) => val == null ? undefined : val.toJSON()), from: obj => marshal.fromList(obj, val => val == null ? undefined : new XcmAsset(undefined, val))}, nullable: false})
  assets!: (XcmAsset | undefined | null)[]

  @Index_()
  @Column_("bool", {nullable: true})
  success!: boolean | undefined | null
}
