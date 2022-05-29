import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {Era} from "./era.model"
import {EraStakingPair} from "./eraStakingPair.model"

@Entity_()
export class EraNominator {
  constructor(props?: Partial<EraNominator>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  stashId!: string

  @Index_()
  @ManyToOne_(() => Account, {nullable: false})
  stash!: Account

  @Index_()
  @ManyToOne_(() => Era, {nullable: false})
  era!: Era

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  bonded!: bigint

  @OneToMany_(() => EraStakingPair, e => e.nominator)
  validators!: EraStakingPair[]
}
