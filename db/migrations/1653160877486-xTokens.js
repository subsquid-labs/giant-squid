module.exports = class xTokens1653160877486 {
  name = 'xTokens1653160877486'

  async up(db) {
    await db.query(`CREATE TABLE "xcm_transfer" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE, "block_number" numeric, "extrinsic_hash" text, "to" jsonb NOT NULL, "asset" jsonb NOT NULL, "from_id" character varying NOT NULL, CONSTRAINT "PK_51dd82383f8ec7d2358b8df0859" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_766473f200d8c26e84ac2252d3" ON "xcm_transfer" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_40a2a3aa9f698a22c3d53ba555" ON "xcm_transfer" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_3f0d207930b0f9602f740a0987" ON "xcm_transfer" ("from_id") `)
    await db.query(`ALTER TABLE "xcm_transfer" ADD CONSTRAINT "FK_3f0d207930b0f9602f740a09877" FOREIGN KEY ("from_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "xcm_transfer"`)
    await db.query(`DROP INDEX "public"."IDX_766473f200d8c26e84ac2252d3"`)
    await db.query(`DROP INDEX "public"."IDX_40a2a3aa9f698a22c3d53ba555"`)
    await db.query(`DROP INDEX "public"."IDX_3f0d207930b0f9602f740a0987"`)
    await db.query(`ALTER TABLE "xcm_transfer" DROP CONSTRAINT "FK_3f0d207930b0f9602f740a09877"`)
  }
}
