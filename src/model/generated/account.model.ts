import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {AccountTransfer} from "./accountTransfer.model"

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @OneToMany_(() => AccountTransfer, e => e.account)
  transfers!: AccountTransfer[]

  @Column_("int4", {nullable: false})
  lastUpdateBlock!: number
}
