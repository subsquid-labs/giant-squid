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

    @Column_("text", {nullable: false})
    controllerId!: string

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    controller!: Account

    @Column_("text", {nullable: true})
    payeeId!: string | undefined | null

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    payee!: Account | undefined | null

    @Column_("varchar", {length: 10, nullable: false})
    payeeType!: PayeeType

    @Column_("varchar", {length: 9, nullable: false})
    role!: StakingRole

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
}
