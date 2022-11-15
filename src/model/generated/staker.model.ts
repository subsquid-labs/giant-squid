import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {DAppStakeState} from "./dAppStakeState.model"
import {Reward} from "./reward.model"
import {Bond} from "./bond.model"

@Entity_()
export class Staker {
  constructor(props?: Partial<Staker>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  stashId!: string

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  stash!: Account

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  activeBond!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  unbondindVolume!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalReward!: bigint

  @OneToMany_(() => DAppStakeState, e => e.staker)
  stakeStates!: DAppStakeState[]

  @OneToMany_(() => Reward, e => e.staker)
  rewards!: Reward[]

  @OneToMany_(() => Bond, e => e.staker)
  bonds!: Bond[]

  @OneToMany_(() => DAppStakeState, e => e.staker)
  activeStakedApps!: DAppStakeState[]
}
