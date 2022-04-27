import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
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

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  stash!: Account | undefined | null

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  controller!: Account | undefined | null

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  payee!: Account | undefined | null

  @Column_("varchar", {length: 10, nullable: true})
  payeeType!: PayeeType | undefined | null

  @Column_("varchar", {length: 9, nullable: true})
  role!: StakingRole | undefined | null

  @Column_("text", {array: true, nullable: true})
  nominators!: (string)[] | undefined | null

  @Column_("integer", {nullable: false})
  commission!: number

  @Column_("text", {array: true, nullable: true})
  validators!: (string)[] | undefined | null
}
