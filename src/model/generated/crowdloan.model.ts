import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Contribution} from "./contribution.model"
import {Parachain} from "./parachain.model"
import {CrowdloanStatus} from "./_crowdloanStatus"

@Entity_()
export class Crowdloan {
    constructor(props?: Partial<Crowdloan>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    cap!: bigint

    @Column_("int4", {nullable: false})
    firstPeriod!: number

    @Column_("int4", {nullable: false})
    lastPeriod!: number

    @Column_("int4", {nullable: true})
    createdAt!: number | undefined | null

    @Column_("timestamp with time zone", {nullable: true})
    createdAtTimestamp!: Date | undefined | null

    @Index_()
    @Column_("int4", {nullable: true})
    endedAt!: number | undefined | null

    @Column_("timestamp with time zone", {nullable: true})
    endedAtTimestamp!: Date | undefined | null

    @OneToMany_(() => Contribution, e => e.crowdloan)
    contributions!: Contribution[]

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    raised!: bigint

    @Column_("text", {nullable: true})
    parachainId!: string | undefined | null

    @Index_()
    @ManyToOne_(() => Parachain, {nullable: true})
    parachain!: Parachain | undefined | null

    @Column_("varchar", {length: 9, nullable: false})
    status!: CrowdloanStatus
}
