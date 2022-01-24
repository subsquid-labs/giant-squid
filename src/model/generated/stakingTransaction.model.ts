import * as marshal from "./marshal"

import {Column as Column_, Entity as Entity_, Index, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class StakingTransaction {
  constructor(props?: Partial<StakingTransaction>) {
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
  @Column_("text", {nullable: false})
  chainName!: string

  @Index()
  @Column_("text", {nullable: false})
  account!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint
}
