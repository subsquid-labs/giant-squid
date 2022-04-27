import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {StakingInfo} from "./stakingInfo.model"

@Entity_()
export class StakingPair {
  constructor(props?: Partial<StakingPair>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => StakingInfo, {nullable: true})
  nominator!: StakingInfo | undefined | null

  @Index_()
  @ManyToOne_(() => StakingInfo, {nullable: true})
  validator!: StakingInfo | undefined | null
}
