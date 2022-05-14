module.exports = class RemoveChain1652529425709 {
  name = 'RemoveChain1652529425709'

  async up(db) {
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_f1f1143749d9fd473890b77054b"`)
    await db.query(`ALTER TABLE "reward" DROP CONSTRAINT "FK_4832b065968736dc04d37ca5daf"`)
    await db.query(`ALTER TABLE "bond" DROP CONSTRAINT "FK_97664afb3da1e6d50ba2e9d956a"`)
    await db.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_6b15368424e1f5cf587c2f3c5ac"`)
    await db.query(`DROP INDEX "public"."IDX_f1f1143749d9fd473890b77054"`)
    await db.query(`DROP INDEX "public"."IDX_4832b065968736dc04d37ca5da"`)
    await db.query(`DROP INDEX "public"."IDX_97664afb3da1e6d50ba2e9d956"`)
    await db.query(`DROP INDEX "public"."IDX_6b15368424e1f5cf587c2f3c5a"`)
    await db.query(`ALTER TABLE "transfer" DROP COLUMN "chain_id"`)
    await db.query(`ALTER TABLE "reward" DROP COLUMN "chain_id"`)
    await db.query(`ALTER TABLE "bond" DROP COLUMN "name"`)
    await db.query(`ALTER TABLE "bond" DROP COLUMN "in_build_total"`)
    await db.query(`ALTER TABLE "bond" DROP COLUMN "chain_id"`)
    await db.query(`ALTER TABLE "account" DROP COLUMN "chain_id"`)
    await db.query(`ALTER TABLE "bond" ADD "type" character varying(6)`)
    await db.query(`ALTER TABLE "bond" ADD "candidate_id" character varying`)
    await db.query(`CREATE INDEX "IDX_9bf939881ebd8d20e5e7830284" ON "bond" ("candidate_id") `)
    await db.query(`ALTER TABLE "bond" ADD CONSTRAINT "FK_9bf939881ebd8d20e5e78302844" FOREIGN KEY ("candidate_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_f1f1143749d9fd473890b77054b" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "reward" ADD CONSTRAINT "FK_4832b065968736dc04d37ca5daf" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "bond" ADD CONSTRAINT "FK_97664afb3da1e6d50ba2e9d956a" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_6b15368424e1f5cf587c2f3c5ac" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`CREATE INDEX "IDX_f1f1143749d9fd473890b77054" ON "transfer" ("chain_id") `)
    await db.query(`CREATE INDEX "IDX_4832b065968736dc04d37ca5da" ON "reward" ("chain_id") `)
    await db.query(`CREATE INDEX "IDX_97664afb3da1e6d50ba2e9d956" ON "bond" ("chain_id") `)
    await db.query(`CREATE INDEX "IDX_6b15368424e1f5cf587c2f3c5a" ON "account" ("chain_id") `)
    await db.query(`ALTER TABLE "transfer" ADD "chain_id" character varying NOT NULL`)
    await db.query(`ALTER TABLE "reward" ADD "chain_id" character varying NOT NULL`)
    await db.query(`ALTER TABLE "bond" ADD "name" text`)
    await db.query(`ALTER TABLE "bond" ADD "in_build_total" numeric`)
    await db.query(`ALTER TABLE "bond" ADD "chain_id" character varying NOT NULL`)
    await db.query(`ALTER TABLE "account" ADD "chain_id" character varying NOT NULL`)
    await db.query(`ALTER TABLE "bond" DROP COLUMN "type"`)
    await db.query(`ALTER TABLE "bond" DROP COLUMN "candidate_id"`)
    await db.query(`DROP INDEX "public"."IDX_9bf939881ebd8d20e5e7830284"`)
    await db.query(`ALTER TABLE "bond" DROP CONSTRAINT "FK_9bf939881ebd8d20e5e78302844"`)
  }
}
