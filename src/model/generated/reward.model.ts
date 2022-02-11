import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Reward {
  constructor(props?: Partial<Reward>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("text", {nullable: true})
  extrinsicId!: string | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  date!: Date | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  blockNumber!: bigint | undefined | null

  @Column_("text", {nullable: true})
  extrinsicHash!: string | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  chainName!: string | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  account!: string | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  amount!: bigint | undefined | null

  @Column_("text", {nullable: true})
  name!: string | undefined | null

  @Column_("integer", {nullable: true})
  era!: number | undefined | null

  @Column_("text", {nullable: true})
  validator!: string | undefined | null
}
