import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Staker} from "./staker.model"
import {Era} from "./era.model"
import {EraNomination} from "./eraNomination.model"

@Entity_()
export class EraValidator {
  constructor(props?: Partial<EraValidator>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  stakerId!: string

  @Index_()
  @ManyToOne_(() => Staker, {nullable: false})
  staker!: Staker

  @Index_()
  @ManyToOne_(() => Era, {nullable: false})
  era!: Era

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  selfBonded!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalBonded!: bigint

  @Column_("int4", {nullable: true})
  commission!: number | undefined | null

  @OneToMany_(() => EraNomination, e => e.validator)
  nominators!: EraNomination[]
}