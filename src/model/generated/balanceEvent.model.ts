import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class BalanceEvent {
  constructor(props?: Partial<BalanceEvent>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date

  @Column_("text", {nullable: false})
  blockHash!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockNumber!: bigint

  @Column_("text", {nullable: true})
  extrinisicHash!: string | undefined | null

  @Column_("text", {nullable: false})
  event!: string

  @Index_()
  @Column_("text", {nullable: true})
  from!: string | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  to!: string | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  account!: string | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  amount!: bigint | undefined | null

  @Column_("text", {nullable: true})
  balanceStatus!: string | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  free!: bigint | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  reserved!: bigint | undefined | null

  @Index_()
  @Column_("text", {nullable: false})
  chainName!: string
}
