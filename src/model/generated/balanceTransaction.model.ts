import * as marshal from "./marshal"

import {Column as Column_, Entity as Entity_, Index, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class BalanceTransaction {
  constructor(props?: Partial<BalanceTransaction>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date

  @Column_("text", {nullable: false})
  blockHash!: string

  @Column_("integer", {nullable: false})
  blockNumber!: number

  @Column_("text", {nullable: true})
  extrinisicHash!: string | undefined | null

  @Column_("text", {nullable: false})
  event!: string

  @Index()
  @Column_("text", {nullable: true})
  from!: string | undefined | null

  @Index()
  @Column_("text", {nullable: true})
  to!: string | undefined | null

  @Index()
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

  @Column_("text", {nullable: false})
  chainName!: string
}
