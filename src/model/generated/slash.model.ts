import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {Staker} from "./staker.model"

@Entity_()
export class Slash {
    constructor(props?: Partial<Slash>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("timestamp with time zone", {nullable: true})
    timestamp!: Date | undefined | null

    @Index_()
    @Column_("int4", {nullable: true})
    blockNumber!: number | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    extrinsicHash!: string | undefined | null

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    account!: Account

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amount!: bigint

    @Column_("int4", {nullable: true})
    era!: number | undefined | null

    @Index_()
    @ManyToOne_(() => Staker, {nullable: true})
    staker!: Staker | undefined | null
}
