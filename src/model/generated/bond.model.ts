import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {BondType} from "./_bondType"

@Entity_()
export class Bond {
  constructor(props?: Partial<Bond>) {
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
  account!: Account

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  amount!: bigint | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  total!: bigint | undefined | null

  @Index_()
  @Column_("bool", {nullable: true})
  success!: boolean | undefined | null

  @Column_("varchar", {length: 6, nullable: true})
  type!: BondType | undefined | null

  @Column_("text", {nullable: true})
  name!: string | undefined | null
}
