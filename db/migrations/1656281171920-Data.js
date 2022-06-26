module.exports = class Data1656281171920 {
  name = 'Data1656281171920'

  async up(db) {
    await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, "extrinsic_hash" text NOT NULL, "to" jsonb, "from" jsonb NOT NULL, "asset" jsonb NOT NULL, "success" boolean NOT NULL, "type" character varying(8) NOT NULL, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_d6624eacc30144ea97915fe846" ON "transfer" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_070c555a86b0b41a534a55a659" ON "transfer" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_d0b7149e0dea3bfc1ffa8742a2" ON "transfer" ("success") `)
    await db.query(`CREATE TABLE "account_transfer" ("id" character varying NOT NULL, "direction" character varying(4), "transfer_id" character varying, "account_id" character varying NOT NULL, CONSTRAINT "PK_3b959a286b97fc83be6cec239a9" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_2c2313461bd6c19983900ef539" ON "account_transfer" ("transfer_id") `)
    await db.query(`CREATE INDEX "IDX_d5240d17696e229585da974641" ON "account_transfer" ("account_id") `)
    await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "last_update_block" integer NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "account_transfer" ADD CONSTRAINT "FK_2c2313461bd6c19983900ef539c" FOREIGN KEY ("transfer_id") REFERENCES "transfer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "account_transfer" ADD CONSTRAINT "FK_d5240d17696e229585da974641a" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "transfer"`)
    await db.query(`DROP INDEX "public"."IDX_d6624eacc30144ea97915fe846"`)
    await db.query(`DROP INDEX "public"."IDX_070c555a86b0b41a534a55a659"`)
    await db.query(`DROP INDEX "public"."IDX_d0b7149e0dea3bfc1ffa8742a2"`)
    await db.query(`DROP TABLE "account_transfer"`)
    await db.query(`DROP INDEX "public"."IDX_2c2313461bd6c19983900ef539"`)
    await db.query(`DROP INDEX "public"."IDX_d5240d17696e229585da974641"`)
    await db.query(`DROP TABLE "account"`)
    await db.query(`ALTER TABLE "account_transfer" DROP CONSTRAINT "FK_2c2313461bd6c19983900ef539c"`)
    await db.query(`ALTER TABLE "account_transfer" DROP CONSTRAINT "FK_d5240d17696e229585da974641a"`)
  }
}
