import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {RmrkInteraction} from "./_rmrkInteraction"
import {RmrkNFT} from "./rmrkNft.model"
import {RmrkCollection} from "./rmrkCollection.model"
import {RmrkEmote} from "./rmrkEmote.model"

@Entity_()
export class RmrkEvent {
  constructor(props?: Partial<RmrkEvent>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("int4", {nullable: false})
  blockNumber!: number

  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  caller!: Account | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  info!: bigint | undefined | null

  @Column_("varchar", {length: 12, nullable: false})
  interaction!: RmrkInteraction

  @Index_()
  @ManyToOne_(() => RmrkNFT, {nullable: true})
  nft!: RmrkNFT | undefined | null

  @Index_()
  @ManyToOne_(() => RmrkCollection, {nullable: true})
  collection!: RmrkCollection | undefined | null

  @Index_()
  @ManyToOne_(() => RmrkEmote, {nullable: true})
  emotion!: RmrkEmote | undefined | null
}
