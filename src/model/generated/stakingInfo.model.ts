import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {Account} from "./account.model"
import {PayeeType} from "./_payeeType"
import {StakingRole} from "./_stakingRole"
import {StakingPair} from "./stakingPair.model"

@Entity_()
export class StakingInfo {
  constructor(props?: Partial<StakingInfo>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Account, {nullable: false})
  stash!: Account

  @Index_()
  @ManyToOne_(() => Account, {nullable: false})
  controller!: Account

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  payee!: Account | undefined | null

  @Column_("varchar", {length: 10, nullable: false})
  payeeType!: PayeeType

  @Column_("varchar", {length: 9, nullable: false})
  role!: StakingRole

  @Column_("integer", {nullable: true})
  commission!: number | undefined | null

  @OneToMany_(() => StakingPair, e => e.nominator)
  nominators!: StakingPair[]

  @OneToMany_(() => StakingPair, e => e.validator)
  validators!: StakingPair[]
}
