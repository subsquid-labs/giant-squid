import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {AccountTransfer} from "./accountTransfer.model"
import {Chain} from "./chain.model"

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @OneToMany_(() => AccountTransfer, e => e.account)
  transfers!: AccountTransfer[]

  @Index_()
  @ManyToOne_(() => Chain, {nullable: false})
  chain!: Chain

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  lastUpdateBlock!: bigint
}
