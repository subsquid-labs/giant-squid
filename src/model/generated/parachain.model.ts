import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {Crowdloan} from "./crowdloan.model"

@Entity_()
export class Parachain {
    constructor(props?: Partial<Parachain>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @OneToMany_(() => Crowdloan, e => e.parachain)
    crowdloans!: Crowdloan[]
}
