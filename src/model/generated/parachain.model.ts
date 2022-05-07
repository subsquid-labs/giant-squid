import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {Crowdloan} from "./crowdloan.model"

@Entity_()
export class Parachain {
  constructor(props?: Partial<Parachain>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: true})
  name!: string | undefined | null

  @Column_("int4", {nullable: true})
  paraId!: number | undefined | null

  @OneToMany_(() => Crowdloan, e => e.parachain)
  crowdloans!: Crowdloan[]

  @Column_("text", {nullable: true})
  relayChain!: string | undefined | null
}
