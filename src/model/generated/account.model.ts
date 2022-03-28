import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {AccountTransfer} from "./accountTransfer.model"
import {Contribution} from "./contribution.model"
import {Reward} from "./reward.model"
import {Slash} from "./slash.model"
import {Bond} from "./bond.model"
import {Chain} from "./chain.model"
import {StakingInfo} from "./_stakingInfo"

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalBond!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalReward!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalSlash!: bigint

  @OneToMany_(() => AccountTransfer, e => e.account)
  transfers!: AccountTransfer[]

  @OneToMany_(() => Contribution, e => e.account)
  contributions!: Contribution[]

  @OneToMany_(() => Reward, e => e.account)
  rewards!: Reward[]

  @OneToMany_(() => Slash, e => e.account)
  slashes!: Slash[]

  @OneToMany_(() => Bond, e => e.account)
  bonds!: Bond[]

  @Index_()
  @ManyToOne_(() => Chain, {nullable: false})
  chain!: Chain

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new StakingInfo(undefined, obj)}, nullable: true})
  stakingInfo!: StakingInfo | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  lastUpdateBlock!: bigint
}
