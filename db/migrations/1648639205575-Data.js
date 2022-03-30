module.exports = class Data1648639205575 {
  name = 'Data1648639205575'

  async up(db) {
    await db.query(`CREATE TABLE "bond" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE, "block_number" numeric, "extrinsic_hash" text, "amount" numeric, "total" numeric, "smart_contract" text, "success" boolean, "name" text, "chain_id" character varying NOT NULL, "account_id" character varying NOT NULL, CONSTRAINT "PK_2a4d050cae7f0326222053ae2b4" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_97664afb3da1e6d50ba2e9d956" ON "bond" ("chain_id") `)
    await db.query(`CREATE INDEX "IDX_838b5fd70c926e7d7c5bcb56ee" ON "bond" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_380e0ca8c041bf10c97b66b184" ON "bond" ("account_id") `)
    await db.query(`CREATE TABLE "reward" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE, "block_number" numeric, "extrinsic_hash" text, "amount" numeric, "era" integer, "smart_contract" text, "total" numeric, "name" text, "chain_id" character varying NOT NULL, "account_id" character varying NOT NULL, CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_4832b065968736dc04d37ca5da" ON "reward" ("chain_id") `)
    await db.query(`CREATE INDEX "IDX_51b4a3885904fbbc1296944ca4" ON "reward" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_4a8843fdb7840bfd00f8e4f7b3" ON "reward" ("account_id") `)
    await db.query(`ALTER TABLE "account" ADD "total_bond" numeric NOT NULL`)
    await db.query(`ALTER TABLE "account" ADD "total_reward" numeric NOT NULL`)
    await db.query(`ALTER TABLE "bond" ADD CONSTRAINT "FK_97664afb3da1e6d50ba2e9d956a" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "bond" ADD CONSTRAINT "FK_380e0ca8c041bf10c97b66b184b" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "reward" ADD CONSTRAINT "FK_4832b065968736dc04d37ca5daf" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "reward" ADD CONSTRAINT "FK_4a8843fdb7840bfd00f8e4f7b36" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "bond"`)
    await db.query(`DROP INDEX "public"."IDX_97664afb3da1e6d50ba2e9d956"`)
    await db.query(`DROP INDEX "public"."IDX_838b5fd70c926e7d7c5bcb56ee"`)
    await db.query(`DROP INDEX "public"."IDX_380e0ca8c041bf10c97b66b184"`)
    await db.query(`DROP TABLE "reward"`)
    await db.query(`DROP INDEX "public"."IDX_4832b065968736dc04d37ca5da"`)
    await db.query(`DROP INDEX "public"."IDX_51b4a3885904fbbc1296944ca4"`)
    await db.query(`DROP INDEX "public"."IDX_4a8843fdb7840bfd00f8e4f7b3"`)
    await db.query(`ALTER TABLE "account" DROP COLUMN "total_bond"`)
    await db.query(`ALTER TABLE "account" DROP COLUMN "total_reward"`)
    await db.query(`ALTER TABLE "bond" DROP CONSTRAINT "FK_97664afb3da1e6d50ba2e9d956a"`)
    await db.query(`ALTER TABLE "bond" DROP CONSTRAINT "FK_380e0ca8c041bf10c97b66b184b"`)
    await db.query(`ALTER TABLE "reward" DROP CONSTRAINT "FK_4832b065968736dc04d37ca5daf"`)
    await db.query(`ALTER TABLE "reward" DROP CONSTRAINT "FK_4a8843fdb7840bfd00f8e4f7b36"`)
  }
}
