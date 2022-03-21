import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {AccountTransfer} from "./accountTransfer.model"
import {Reward} from "./reward.model"
import {Slash} from "./slash.model"
import {Stake} from "./stake.model"
import {Chain} from "./chain.model"

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  totalStake!: bigint | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  totalReward!: bigint | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  totalSlash!: bigint | undefined | null

  @OneToMany_(() => AccountTransfer, e => e.account)
  transfers!: AccountTransfer[]

  @OneToMany_(() => Reward, e => e.account)
  rewards!: Reward[]

  @OneToMany_(() => Slash, e => e.account)
  slashes!: Slash[]

  @OneToMany_(() => Stake, e => e.account)
  stakes!: Stake[]

  @Index_()
  @ManyToOne_(() => Chain, {nullable: false})
  chain!: Chain
}
