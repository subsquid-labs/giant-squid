import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Era} from "./era.model"
import {EraStaker} from "./eraStaker.model"

@Entity_()
export class EraNomination {
    constructor(props?: Partial<EraNomination>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Era, {nullable: true})
    era!: Era

    @Index_()
    @ManyToOne_(() => EraStaker, {nullable: true})
    nominator!: EraStaker | undefined | null

    @Index_()
    @ManyToOne_(() => EraStaker, {nullable: true})
    validator!: EraStaker | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    vote!: bigint
}
