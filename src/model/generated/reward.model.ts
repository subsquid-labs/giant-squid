import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {Era} from "./era.model"
import {Staker} from "./staker.model"
import {RewardReciever} from "./_rewardReciever"

@Entity_()
export class Reward {
  constructor(props?: Partial<Reward>) {
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

  @Index_()
  @ManyToOne_(() => Era, {nullable: true})
  era!: Era

  @Index_()
  @ManyToOne_(() => Staker, {nullable: true})
  staker!: Staker

  @Column_("varchar", {length: 6, nullable: false})
  recieverType!: RewardReciever
}
