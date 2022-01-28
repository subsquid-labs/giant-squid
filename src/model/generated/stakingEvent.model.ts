import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class StakingEvent {
  constructor(props?: Partial<StakingEvent>) {
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
  @Column_("text", {nullable: false})
  chainName!: string

  @Index_()
  @Column_("text", {nullable: false})
  account!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint
}
