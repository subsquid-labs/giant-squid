import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {BondType} from "./_bondType"
import {Staker} from "./staker.model"
import {DAppContract} from "./dAppContract.model"

@Entity_()
export class Bond {
  constructor(props?: Partial<Bond>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date

  @Index_()
  @Column_("int4", {nullable: true})
  blockNumber!: number | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  extrinsicHash!: string | undefined | null

  @Column_("text", {nullable: false})
  accountId!: string

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  account!: Account

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint

  @Column_("varchar", {length: 6, nullable: false})
  type!: BondType

  @Column_("text", {nullable: false})
  stakerId!: string

  @Index_()
  @ManyToOne_(() => Staker, {nullable: true})
  staker!: Staker

  @Index_()
  @ManyToOne_(() => DAppContract, {nullable: true})
  contract!: DAppContract
}
