module.exports = class Data1648056008913 {
  name = 'Data1648056008913'

  async up(db) {
    await db.query(`ALTER TABLE "crowdloan" DROP CONSTRAINT "FK_005883fcd4519fa5ae88706b3a5"`)
    await db.query(`ALTER TABLE "account" RENAME COLUMN "total_stake" TO "total_bond"`)
    await db.query(`CREATE TABLE "bond" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE, "block_number" numeric, "extrinsic_hash" text, "amount" numeric, "total" numeric, "success" boolean, "name" text, "chain_id" character varying NOT NULL, "account_id" character varying NOT NULL, CONSTRAINT "PK_2a4d050cae7f0326222053ae2b4" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_97664afb3da1e6d50ba2e9d956" ON "bond" ("chain_id") `)
    await db.query(`CREATE INDEX "IDX_b3ec1c99bd71224c6ef11cf5b0" ON "bond" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_838b5fd70c926e7d7c5bcb56ee" ON "bond" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_380e0ca8c041bf10c97b66b184" ON "bond" ("account_id") `)
    await db.query(`CREATE INDEX "IDX_0bd97db4e1e32b00a831351680" ON "bond" ("success") `)
    await db.query(`ALTER TABLE "chain" ADD "para_id" integer`)
    await db.query(`ALTER TABLE "chain" ADD "relay_chain_id" character varying`)
    await db.query(`CREATE INDEX "IDX_a8aa9728dd8b443ef9ab770392" ON "chain" ("relay_chain_id") `)
    await db.query(`ALTER TABLE "crowdloan" ADD CONSTRAINT "FK_005883fcd4519fa5ae88706b3a5" FOREIGN KEY ("parachain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "chain" ADD CONSTRAINT "FK_a8aa9728dd8b443ef9ab770392e" FOREIGN KEY ("relay_chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "bond" ADD CONSTRAINT "FK_97664afb3da1e6d50ba2e9d956a" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "bond" ADD CONSTRAINT "FK_380e0ca8c041bf10c97b66b184b" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "crowdloan" ADD CONSTRAINT "FK_005883fcd4519fa5ae88706b3a5" FOREIGN KEY ("parachain_id") REFERENCES "parachain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "account" RENAME COLUMN "total_bond" TO "total_stake"`)
    await db.query(`DROP TABLE "bond"`)
    await db.query(`DROP INDEX "public"."IDX_97664afb3da1e6d50ba2e9d956"`)
    await db.query(`DROP INDEX "public"."IDX_b3ec1c99bd71224c6ef11cf5b0"`)
    await db.query(`DROP INDEX "public"."IDX_838b5fd70c926e7d7c5bcb56ee"`)
    await db.query(`DROP INDEX "public"."IDX_380e0ca8c041bf10c97b66b184"`)
    await db.query(`DROP INDEX "public"."IDX_0bd97db4e1e32b00a831351680"`)
    await db.query(`ALTER TABLE "chain" DROP COLUMN "para_id"`)
    await db.query(`ALTER TABLE "chain" DROP COLUMN "relay_chain_id"`)
    await db.query(`DROP INDEX "public"."IDX_a8aa9728dd8b443ef9ab770392"`)
    await db.query(`ALTER TABLE "crowdloan" DROP CONSTRAINT "FK_005883fcd4519fa5ae88706b3a5"`)
    await db.query(`ALTER TABLE "chain" DROP CONSTRAINT "FK_a8aa9728dd8b443ef9ab770392e"`)
    await db.query(`ALTER TABLE "bond" DROP CONSTRAINT "FK_97664afb3da1e6d50ba2e9d956a"`)
    await db.query(`ALTER TABLE "bond" DROP CONSTRAINT "FK_380e0ca8c041bf10c97b66b184b"`)
  }
}
