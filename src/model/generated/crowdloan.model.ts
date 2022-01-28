import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Crowdloan {
  constructor(props?: Partial<Crowdloan>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  cap!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  firstPeriod!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  lastPeriod!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  end!: bigint

  @Column_("text", {array: true, nullable: true})
  contributors!: (string | undefined | null)[] | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  raised!: bigint
}
