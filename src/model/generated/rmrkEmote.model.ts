import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {RmrkNFT} from "./rmrkNft.model"
import {Account} from "./account.model"

@Entity_()
export class RmrkEmote {
  constructor(props?: Partial<RmrkEmote>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => RmrkNFT, {nullable: false})
  nft!: RmrkNFT

  @Index_()
  @ManyToOne_(() => Account, {nullable: false})
  caller!: Account

  @Column_("text", {nullable: false})
  value!: string

  @Column_("timestamp with time zone", {nullable: false})
  lastEmotion!: Date

  @Column_("int4", {nullable: false})
  count!: number

  @Column_("bool", {nullable: false})
  active!: boolean
}
