import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Round {
  constructor(props?: Partial<Round>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("integer", {nullable: false})
  startingBlock!: number

  @Column_("integer", {nullable: false})
  round!: number

  @Column_("integer", {nullable: false})
  selectedCollatorsNumber!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalBalance!: bigint

  @Column_("timestamp with time zone", {nullable: true})
  date!: Date | undefined | null

  @Index_()
  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  blockNumber!: bigint | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  extrinsicHash!: string | undefined | null
}
