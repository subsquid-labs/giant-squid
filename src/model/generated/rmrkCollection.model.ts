import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {RmrkNFT} from "./rmrkNft.model"
import {RmrkEvent} from "./rmrkEvent.model"

@Entity_()
export class RmrkCollection {
  constructor(props?: Partial<RmrkCollection>) {
    Object.assign(this, props)
  }

  @Column_("text", {nullable: true})
  name!: string | undefined | null

  @Column_("int4", {nullable: false})
  max!: number

  @Column_("text", {nullable: false})
  issuer!: string

  @Column_("text", {nullable: true})
  symbol!: string | undefined | null

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: true})
  metadata!: string | undefined | null

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  currentOwner!: Account | undefined | null

  @OneToMany_(() => RmrkNFT, e => e.collection)
  nfts!: RmrkNFT[]

  @OneToMany_(() => RmrkEvent, e => e.collection)
  events!: RmrkEvent[]

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  blockNumber!: bigint | undefined | null

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date
}
