import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Token} from "./_token"
import {Crowdloan} from "./crowdloan.model"

@Entity_()
export class Chain {
  constructor(props?: Partial<Chain>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => new Token(undefined, marshal.nonNull(obj))}, nullable: false})
  token!: Token

  @Column_("int4", {nullable: true})
  paraId!: number | undefined | null

  @OneToMany_(() => Crowdloan, e => e.parachain)
  crowdloans!: Crowdloan[]

  @Index_()
  @ManyToOne_(() => Chain, {nullable: true})
  relayChain!: Chain | undefined | null
}
