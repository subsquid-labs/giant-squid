import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"
import {RmrkAttribute} from "./_rmrkAttribute"

@Entity_()
export class RmrkMetadata {
  constructor(props?: Partial<RmrkMetadata>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: true})
  name!: string | undefined | null

  @Column_("text", {nullable: true})
  description!: string | undefined | null

  @Column_("text", {nullable: true})
  image!: string | undefined | null

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.map((val: any) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new RmrkAttribute(undefined, marshal.nonNull(val)))}, nullable: true})
  attributes!: (RmrkAttribute)[] | undefined | null

  @Column_("text", {nullable: true})
  animationUrl!: string | undefined | null

  @Column_("text", {nullable: true})
  type!: string | undefined | null
}
