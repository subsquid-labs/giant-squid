import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_, Index as Index_, JoinColumn as JoinColumn_, ManyToOne as ManyToOne_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {PayeeType} from "./_payeeType"
import {StakingRole} from "./_stakingRole"
import {EraStaker} from "./eraStaker.model"
import {Reward} from "./reward.model"
import {Slash} from "./slash.model"
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

  @Index_({unique: true})
  @OneToOne_(() => Account, {nullable: false})
  @JoinColumn_()
  stash!: Account

  @Column_("text", {nullable: true})
  controllerId!: string | undefined | null

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  controller!: Account | undefined | null

  @Column_("text", {nullable: true})
  payeeId!: string | undefined | null

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  payee!: Account | undefined | null

  @Column_("varchar", {length: 10, nullable: true})
  payeeType!: PayeeType | undefined | null

  @Column_("varchar", {length: 9, nullable: true})
  role!: StakingRole | undefined | null

  @Column_("int4", {nullable: true})
  commission!: number | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  activeBond!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalReward!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalSlash!: bigint

  @OneToMany_(() => EraStaker, e => e.staker)
  stakerHistory!: EraStaker[]

  @OneToMany_(() => Reward, e => e.staker)
  rewards!: Reward[]

  @OneToMany_(() => Slash, e => e.staker)
  slashes!: Slash[]

  @OneToMany_(() => Bond, e => e.staker)
  bonds!: Bond[]

  @Column_("int4", {nullable: false})
  syncedAt!: number
}
