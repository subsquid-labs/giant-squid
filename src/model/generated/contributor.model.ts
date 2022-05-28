import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Crowdloan} from "./crowdloan.model"
import {Account} from "./account.model"
import {Contribution} from "./contribution.model"

@Entity_()
export class Contributor {
  constructor(props?: Partial<Contributor>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Crowdloan, {nullable: false})
  crowdloan!: Crowdloan

  @Index_()
  @ManyToOne_(() => Account, {nullable: false})
  account!: Account

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint

  @OneToMany_(() => Contribution, e => e.contributor)
  contributions!: Contribution[]
}
