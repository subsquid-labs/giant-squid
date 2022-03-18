import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Crowdloan} from "./crowdloan.model"
import {Chain} from "./chain.model"

@Entity_()
export class Parachain {
  constructor(props?: Partial<Parachain>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  name!: string

  @OneToMany_(() => Crowdloan, e => e.parachain)
  crowdloans!: Crowdloan[]

  @Index_()
  @ManyToOne_(() => Chain, {nullable: true})
  relayChain!: Chain | undefined | null
}
