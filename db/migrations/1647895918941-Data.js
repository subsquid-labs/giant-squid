module.exports = class Data1647895918941 {
  name = 'Data1647895918941'

  async up(db) {
    await db.query(`CREATE TABLE "reward" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE, "block_number" numeric, "extrinsic_hash" text, "amount" numeric, "era" integer, "smart_contract" text, "total" numeric, "name" text, "chain_id" character varying NOT NULL, "account_id" character varying NOT NULL, CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_4832b065968736dc04d37ca5da" ON "reward" ("chain_id") `)
    await db.query(`CREATE INDEX "IDX_51b4a3885904fbbc1296944ca4" ON "reward" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_4a8843fdb7840bfd00f8e4f7b3" ON "reward" ("account_id") `)
    await db.query(`CREATE TABLE "stake" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE, "block_number" numeric, "extrinsic_hash" text, "amount" numeric, "total" numeric, "smart_contract" text, "success" boolean, "name" text, "chain_id" character varying NOT NULL, "account_id" character varying NOT NULL, CONSTRAINT "PK_8cfd82a65916af9d517d25a894e" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_30e9455c5aa944326797150a1b" ON "stake" ("chain_id") `)
    await db.query(`CREATE INDEX "IDX_7262328942fab72e89fd456189" ON "stake" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_48a0a4f6ef7ee7a7395cdce1a2" ON "stake" ("account_id") `)
    await db.query(`ALTER TABLE "account" ADD "total_stake" numeric NOT NULL`)
    await db.query(`ALTER TABLE "account" ADD "total_reward" numeric NOT NULL`)
    await db.query(`ALTER TABLE "reward" ADD CONSTRAINT "FK_4832b065968736dc04d37ca5daf" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "reward" ADD CONSTRAINT "FK_4a8843fdb7840bfd00f8e4f7b36" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "stake" ADD CONSTRAINT "FK_30e9455c5aa944326797150a1bb" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "stake" ADD CONSTRAINT "FK_48a0a4f6ef7ee7a7395cdce1a2a" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "reward"`)
    await db.query(`DROP INDEX "public"."IDX_4832b065968736dc04d37ca5da"`)
    await db.query(`DROP INDEX "public"."IDX_51b4a3885904fbbc1296944ca4"`)
    await db.query(`DROP INDEX "public"."IDX_4a8843fdb7840bfd00f8e4f7b3"`)
    await db.query(`DROP TABLE "stake"`)
    await db.query(`DROP INDEX "public"."IDX_30e9455c5aa944326797150a1b"`)
    await db.query(`DROP INDEX "public"."IDX_7262328942fab72e89fd456189"`)
    await db.query(`DROP INDEX "public"."IDX_48a0a4f6ef7ee7a7395cdce1a2"`)
    await db.query(`ALTER TABLE "account" DROP COLUMN "total_stake"`)
    await db.query(`ALTER TABLE "account" DROP COLUMN "total_reward"`)
    await db.query(`ALTER TABLE "reward" DROP CONSTRAINT "FK_4832b065968736dc04d37ca5daf"`)
    await db.query(`ALTER TABLE "reward" DROP CONSTRAINT "FK_4a8843fdb7840bfd00f8e4f7b36"`)
    await db.query(`ALTER TABLE "stake" DROP CONSTRAINT "FK_30e9455c5aa944326797150a1bb"`)
    await db.query(`ALTER TABLE "stake" DROP CONSTRAINT "FK_48a0a4f6ef7ee7a7395cdce1a2a"`)
  }
}
