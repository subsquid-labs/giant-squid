import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Reward} from "./reward.model"

@Entity_()
export class Era {
  constructor(props?: Partial<Era>) {
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

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalStakerRewardsRecieved!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalAppsRewardsRecieved!: bigint

  @OneToMany_(() => Reward, e => e.era)
  rewards!: Reward[]
}
