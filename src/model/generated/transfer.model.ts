import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, PrimaryGeneratedColumn} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Transfer {
  constructor(props?: Partial<Transfer>) {
    Object.assign(this, props)
  }

  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Index_()
  @Column_("text", {nullable: true})
  eventId!: string | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  extrinsicId!: string | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  blockNumber!: bigint | undefined | null

  @Column_("text", {nullable: true})
  extrinsicHash!: string | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  to!: string | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  from!: string | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  amount!: bigint | undefined | null

  @Column_("bool", {nullable: true})
  success!: boolean | undefined | null

  @Column_("text", {nullable: true})
  name!: string | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  date!: Date | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  chainName!: string | undefined | null
}
