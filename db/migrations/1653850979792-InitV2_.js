module.exports = class InitV2_1653850979792 {
  name = 'InitV2_1653850979792'

  async up(db) {
    await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE, "block_number" numeric, "extrinsic_hash" text, "to_id" character varying, "from_id" character varying NOT NULL, "amount" numeric, "success" boolean, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_070c555a86b0b41a534a55a659" ON "transfer" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_0751309c66e97eac9ef1149362" ON "transfer" ("to_id") `)
    await db.query(`CREATE INDEX "IDX_76bdfed1a7eb27c6d8ecbb7349" ON "transfer" ("from_id") `)
    await db.query(`CREATE INDEX "IDX_d0b7149e0dea3bfc1ffa8742a2" ON "transfer" ("success") `)
    await db.query(`CREATE TABLE "account_transfer" ("id" character varying NOT NULL, "direction" character varying(4), "transfer_id" character varying, "account_id" character varying NOT NULL, CONSTRAINT "PK_3b959a286b97fc83be6cec239a9" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_2c2313461bd6c19983900ef539" ON "account_transfer" ("transfer_id") `)
    await db.query(`CREATE INDEX "IDX_d5240d17696e229585da974641" ON "account_transfer" ("account_id") `)
    await db.query(`CREATE TABLE "xcm_transfer" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE, "block_number" numeric, "extrinsic_hash" text, "from_id" character varying NOT NULL, "to" jsonb NOT NULL, "assets" jsonb NOT NULL, "success" boolean, CONSTRAINT "PK_51dd82383f8ec7d2358b8df0859" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_766473f200d8c26e84ac2252d3" ON "xcm_transfer" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_40a2a3aa9f698a22c3d53ba555" ON "xcm_transfer" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_3f0d207930b0f9602f740a0987" ON "xcm_transfer" ("from_id") `)
    await db.query(`CREATE INDEX "IDX_0edf473885a1159ce992c10bbd" ON "xcm_transfer" ("success") `)
    await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "last_update_block" numeric NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_0751309c66e97eac9ef11493623" FOREIGN KEY ("to_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496" FOREIGN KEY ("from_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "account_transfer" ADD CONSTRAINT "FK_2c2313461bd6c19983900ef539c" FOREIGN KEY ("transfer_id") REFERENCES "transfer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "account_transfer" ADD CONSTRAINT "FK_d5240d17696e229585da974641a" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "xcm_transfer" ADD CONSTRAINT "FK_3f0d207930b0f9602f740a09877" FOREIGN KEY ("from_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "transfer"`)
    await db.query(`DROP INDEX "public"."IDX_070c555a86b0b41a534a55a659"`)
    await db.query(`DROP INDEX "public"."IDX_0751309c66e97eac9ef1149362"`)
    await db.query(`DROP INDEX "public"."IDX_76bdfed1a7eb27c6d8ecbb7349"`)
    await db.query(`DROP INDEX "public"."IDX_d0b7149e0dea3bfc1ffa8742a2"`)
    await db.query(`DROP TABLE "account_transfer"`)
    await db.query(`DROP INDEX "public"."IDX_2c2313461bd6c19983900ef539"`)
    await db.query(`DROP INDEX "public"."IDX_d5240d17696e229585da974641"`)
    await db.query(`DROP TABLE "xcm_transfer"`)
    await db.query(`DROP INDEX "public"."IDX_766473f200d8c26e84ac2252d3"`)
    await db.query(`DROP INDEX "public"."IDX_40a2a3aa9f698a22c3d53ba555"`)
    await db.query(`DROP INDEX "public"."IDX_3f0d207930b0f9602f740a0987"`)
    await db.query(`DROP INDEX "public"."IDX_0edf473885a1159ce992c10bbd"`)
    await db.query(`DROP TABLE "account"`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_0751309c66e97eac9ef11493623"`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496"`)
    await db.query(`ALTER TABLE "account_transfer" DROP CONSTRAINT "FK_2c2313461bd6c19983900ef539c"`)
    await db.query(`ALTER TABLE "account_transfer" DROP CONSTRAINT "FK_d5240d17696e229585da974641a"`)
    await db.query(`ALTER TABLE "xcm_transfer" DROP CONSTRAINT "FK_3f0d207930b0f9602f740a09877"`)
  }
}
