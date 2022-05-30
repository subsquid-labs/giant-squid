import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {AccountTransfer} from "./accountTransfer.model"
import {Bond} from "./bond.model"
import {Reward} from "./reward.model"

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  activeBond!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalReward!: bigint

  @OneToMany_(() => AccountTransfer, e => e.account)
  transfers!: AccountTransfer[]

  @OneToMany_(() => Bond, e => e.account)
  bonds!: Bond[]

  @OneToMany_(() => Reward, e => e.account)
  rewards!: Reward[]

  @Column_("int4", {nullable: false})
  lastUpdateBlock!: number
}
