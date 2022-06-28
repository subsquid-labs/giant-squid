import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {RmrkCollection} from "./rmrkCollection.model"
import {Account} from "./account.model"
import {RmrkEvent} from "./rmrkEvent.model"
import {RmrkEmote} from "./rmrkEmote.model"

@Entity_()
export class RmrkNFT {
  constructor(props?: Partial<RmrkNFT>) {
    Object.assign(this, props)
  }

  @Column_("text", {nullable: true})
  name!: string | undefined | null

  @Column_("text", {nullable: true})
  instance!: string | undefined | null

  @Column_("int4", {nullable: true})
  transferable!: number | undefined | null

  @Index_()
  @ManyToOne_(() => RmrkCollection, {nullable: false})
  collection!: RmrkCollection

  @Column_("text", {nullable: true})
  issuer!: string | undefined | null

  @Column_("text", {nullable: true})
  sn!: string | undefined | null

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: true})
  metadata!: string | undefined | null

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  currentOwner!: Account | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  price!: bigint

  @Column_("bool", {nullable: false})
  burned!: boolean

  @Column_("int4", {nullable: false})
  blockNumber!: number

  @OneToMany_(() => RmrkEvent, e => e.nft)
  events!: RmrkEvent[]

  @OneToMany_(() => RmrkEmote, e => e.nft)
  emotes!: RmrkEmote[]

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date

  @Column_("timestamp with time zone", {nullable: false})
  updatedAt!: Date
}
