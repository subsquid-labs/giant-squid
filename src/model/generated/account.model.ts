import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {AccountTransfer} from "./accountTransfer.model"
import {XcmTransfer} from "./xcmTransfer.model"

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @OneToMany_(() => AccountTransfer, e => e.account)
  transfers!: AccountTransfer[]

  @OneToMany_(() => XcmTransfer, e => e.from)
  xcmTransfers!: XcmTransfer[]

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  lastUpdateBlock!: bigint
}
