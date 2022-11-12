import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_, Index as Index_, JoinColumn as JoinColumn_, OneToMany as OneToMany_} from "typeorm"
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

  @Index_({unique: true})
  @OneToOne_(() => Account, {nullable: false})
  @JoinColumn_()
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
