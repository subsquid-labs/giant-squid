import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Staker} from "./staker.model"
import {DAppContract} from "./dAppContract.model"

@Entity_()
export class DAppStakeState {
  constructor(props?: Partial<DAppStakeState>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Staker, {nullable: true})
  staker!: Staker

  @Index_()
  @ManyToOne_(() => DAppContract, {nullable: true})
  contract!: DAppContract

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  stakeVolume!: bigint
}
