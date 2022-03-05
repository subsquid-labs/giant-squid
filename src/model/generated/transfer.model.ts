import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"

@Entity_()
export class Transfer {
  constructor(props?: Partial<Transfer>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("text", {nullable: true})
  chainName!: string | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  date!: Date | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  blockNumber!: bigint | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  extrinsicHash!: string | undefined | null

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  to!: Account | undefined | null

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  from!: Account | undefined | null

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  account!: Account | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  amount!: bigint | undefined | null

  @Index_()
  @Column_("bool", {nullable: true})
  success!: boolean | undefined | null

  @Column_("text", {nullable: true})
  name!: string | undefined | null
}
