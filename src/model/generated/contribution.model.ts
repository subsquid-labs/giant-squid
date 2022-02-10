import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_, PrimaryGeneratedColumn} from "typeorm"
import * as marshal from "./marshal"
import {Crowdloan} from "./crowdloan.model"

@Entity_()
export class Contribution {
  constructor(props?: Partial<Contribution>) {
    Object.assign(this, props)
  }

  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column_("text", {nullable: true})
  eventId!: string | undefined | null

  @Column_("text", {nullable: true})
  extrinsicId!: string | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  date!: Date | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  blockNumber!: bigint | undefined | null

  @Column_("text", {nullable: true})
  extrinsicHash!: string | undefined | null

  @Index_()
  @Column_("text", {nullable: false})
  chainName!: string

  @Index_()
  @ManyToOne_(() => Crowdloan, {nullable: true})
  crowdloan!: Crowdloan | undefined | null

  @Column_("bool", {nullable: true})
  success!: boolean | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  account!: string | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  amount!: bigint | undefined | null
}
