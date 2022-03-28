module.exports = class Data1648477958637 {
  name = 'Data1648477958637'

  async up(db) {
    await db.query(`CREATE TABLE "chain" ("id" character varying NOT NULL, "token" jsonb NOT NULL, "para_id" integer, "relay_chain_id" character varying, CONSTRAINT "PK_8e273aafae283b886672c952ecd" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_a8aa9728dd8b443ef9ab770392" ON "chain" ("relay_chain_id") `)
    await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE, "block_number" numeric, "extrinsic_hash" text, "amount" numeric, "success" boolean, "name" text, "chain_id" character varying NOT NULL, "to_id" character varying NOT NULL, "from_id" character varying NOT NULL, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_f1f1143749d9fd473890b77054" ON "transfer" ("chain_id") `)
    await db.query(`CREATE INDEX "IDX_070c555a86b0b41a534a55a659" ON "transfer" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_0751309c66e97eac9ef1149362" ON "transfer" ("to_id") `)
    await db.query(`CREATE INDEX "IDX_76bdfed1a7eb27c6d8ecbb7349" ON "transfer" ("from_id") `)
    await db.query(`CREATE INDEX "IDX_d0b7149e0dea3bfc1ffa8742a2" ON "transfer" ("success") `)
    await db.query(`CREATE TABLE "account_transfer" ("id" character varying NOT NULL, "direction" character varying(4), "transfer_id" character varying, "account_id" character varying NOT NULL, CONSTRAINT "PK_3b959a286b97fc83be6cec239a9" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_2c2313461bd6c19983900ef539" ON "account_transfer" ("transfer_id") `)
    await db.query(`CREATE INDEX "IDX_d5240d17696e229585da974641" ON "account_transfer" ("account_id") `)
    await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "last_update_block" numeric NOT NULL, "chain_id" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_6b15368424e1f5cf587c2f3c5a" ON "account" ("chain_id") `)
    await db.query(`ALTER TABLE "chain" ADD CONSTRAINT "FK_a8aa9728dd8b443ef9ab770392e" FOREIGN KEY ("relay_chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_f1f1143749d9fd473890b77054b" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_0751309c66e97eac9ef11493623" FOREIGN KEY ("to_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496" FOREIGN KEY ("from_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "account_transfer" ADD CONSTRAINT "FK_2c2313461bd6c19983900ef539c" FOREIGN KEY ("transfer_id") REFERENCES "transfer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "account_transfer" ADD CONSTRAINT "FK_d5240d17696e229585da974641a" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_6b15368424e1f5cf587c2f3c5ac" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "chain"`)
    await db.query(`DROP INDEX "public"."IDX_a8aa9728dd8b443ef9ab770392"`)
    await db.query(`DROP TABLE "transfer"`)
    await db.query(`DROP INDEX "public"."IDX_f1f1143749d9fd473890b77054"`)
    await db.query(`DROP INDEX "public"."IDX_070c555a86b0b41a534a55a659"`)
    await db.query(`DROP INDEX "public"."IDX_0751309c66e97eac9ef1149362"`)
    await db.query(`DROP INDEX "public"."IDX_76bdfed1a7eb27c6d8ecbb7349"`)
    await db.query(`DROP INDEX "public"."IDX_d0b7149e0dea3bfc1ffa8742a2"`)
    await db.query(`DROP TABLE "account_transfer"`)
    await db.query(`DROP INDEX "public"."IDX_2c2313461bd6c19983900ef539"`)
    await db.query(`DROP INDEX "public"."IDX_d5240d17696e229585da974641"`)
    await db.query(`DROP TABLE "account"`)
    await db.query(`DROP INDEX "public"."IDX_6b15368424e1f5cf587c2f3c5a"`)
    await db.query(`ALTER TABLE "chain" DROP CONSTRAINT "FK_a8aa9728dd8b443ef9ab770392e"`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_f1f1143749d9fd473890b77054b"`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_0751309c66e97eac9ef11493623"`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496"`)
    await db.query(`ALTER TABLE "account_transfer" DROP CONSTRAINT "FK_2c2313461bd6c19983900ef539c"`)
    await db.query(`ALTER TABLE "account_transfer" DROP CONSTRAINT "FK_d5240d17696e229585da974641a"`)
    await db.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_6b15368424e1f5cf587c2f3c5ac"`)
  }
}
