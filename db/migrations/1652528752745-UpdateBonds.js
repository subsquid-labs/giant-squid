module.exports = class UpdateBonds1652528752745 {
  name = 'UpdateBonds1652528752745'

  async up(db) {
    await db.query(`ALTER TABLE "bond" DROP COLUMN "name"`)
    await db.query(`ALTER TABLE "bond" DROP COLUMN "in_build_total"`)
    await db.query(`ALTER TABLE "bond" ADD "type" character varying(6)`)
    await db.query(`ALTER TABLE "bond" ADD "candidate_id" character varying`)
    await db.query(`CREATE INDEX "IDX_9bf939881ebd8d20e5e7830284" ON "bond" ("candidate_id") `)
    await db.query(`ALTER TABLE "bond" ADD CONSTRAINT "FK_9bf939881ebd8d20e5e78302844" FOREIGN KEY ("candidate_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "bond" ADD "name" text`)
    await db.query(`ALTER TABLE "bond" ADD "in_build_total" numeric`)
    await db.query(`ALTER TABLE "bond" DROP COLUMN "type"`)
    await db.query(`ALTER TABLE "bond" DROP COLUMN "candidate_id"`)
    await db.query(`DROP INDEX "public"."IDX_9bf939881ebd8d20e5e7830284"`)
    await db.query(`ALTER TABLE "bond" DROP CONSTRAINT "FK_9bf939881ebd8d20e5e78302844"`)
  }
}
