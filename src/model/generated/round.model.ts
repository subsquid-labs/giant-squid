import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Round {
  constructor(props?: Partial<Round>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("int4", {nullable: false})
  index!: number

  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date

  @Column_("int4", {nullable: false})
  startedAt!: number

  @Column_("int4", {nullable: true})
  endedAt!: number | undefined | null

  @Column_("int4", {nullable: false})
  collatorsCount!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  total!: bigint
}
