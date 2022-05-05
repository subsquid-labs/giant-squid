import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {EraValidator} from "./eraValidator.model"
import {EraNominator} from "./eraNominator.model"

@Entity_()
export class Era {
  constructor(props?: Partial<Era>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("integer", {nullable: false})
  index!: number

  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date

  @Column_("integer", {nullable: false})
  startedAt!: number

  @Column_("integer", {nullable: true})
  endedAt!: number | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  total!: bigint

  @OneToMany_(() => EraValidator, e => e.era)
  validators!: EraValidator[]

  @OneToMany_(() => EraNominator, e => e.era)
  nominators!: EraNominator[]
}
