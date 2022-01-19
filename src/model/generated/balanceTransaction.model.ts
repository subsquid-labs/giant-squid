import * as marshal from "./marshal"

import {Column as Column_, Entity as Entity_, Index as Index_, PrimaryColumn as PrimaryColumn_} from "typeorm"

import {BalanceData} from "./_balanceData"
import {BalanceEventType} from "./_balanceEventType"

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

  @Index_()
  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new BalanceData(undefined, obj)}, nullable: true})
  data!: BalanceData | undefined | null

  @Column_("varchar", {length: 18, nullable: true})
  event!: BalanceEventType | undefined | null
}
