import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {Bond} from "./bond.model"
import {DAppStakeState} from "./dAppStakeState.model"
import {DAppState} from "./_dAppState"

@Entity_()
export class DAppContract {
  constructor(props?: Partial<DAppContract>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  developerId!: string

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  developer!: Account

  @OneToMany_(() => Bond, e => e.contract)
  bondHistory!: Bond[]

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  activeStake!: bigint

  @OneToMany_(() => DAppStakeState, e => e.contract)
  stakers!: DAppStakeState[]

  @Column_("varchar", {length: 12, nullable: false})
  state!: DAppState
}
