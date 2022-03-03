import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Transfer} from "./transfer.model"
import {Contribution} from "./contribution.model"
import {Reward} from "./reward.model"
import {Slash} from "./slash.model"
import {Stake} from "./stake.model"

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

  @OneToMany_(() => Transfer, e => e.account)
  transfers!: Transfer[]

  @OneToMany_(() => Contribution, e => e.account)
  contributions!: Contribution[]

  @OneToMany_(() => Reward, e => e.account)
  rewards!: Reward[]

  @OneToMany_(() => Slash, e => e.account)
  slashes!: Slash[]

  @OneToMany_(() => Stake, e => e.account)
  stakes!: Stake[]
}
