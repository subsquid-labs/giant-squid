import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_, Index as Index_, JoinColumn as JoinColumn_, ManyToOne as ManyToOne_} from "typeorm"
import {Account} from "./account.model"
import {PayeeType} from "./_payeeType"
import {StakingRole} from "./_stakingRole"

@Entity_()
export class StakingInfo {
  constructor(props?: Partial<StakingInfo>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_({unique: true})
  @OneToOne_(() => Account, {nullable: false})
  @JoinColumn_()
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
}
