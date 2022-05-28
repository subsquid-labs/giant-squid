module.exports = class ContributionsInContributors1653730922853 {
  name = 'ContributionsInContributors1653730922853'

  async up(db) {
    await db.query(`ALTER TABLE "contribution" ADD "contributor_id" character varying NOT NULL`)
    await db.query(`CREATE INDEX "IDX_2dbb170adc1fcfdd1061e5efe5" ON "contribution" ("contributor_id") `)
    await db.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_2dbb170adc1fcfdd1061e5efe57" FOREIGN KEY ("contributor_id") REFERENCES "contributor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_2dbb170adc1fcfdd1061e5efe57"`)
    await db.query(`ALTER TABLE "contribution" DROP COLUMN "contributor_id"`)
    await db.query(`DROP INDEX "public"."IDX_2dbb170adc1fcfdd1061e5efe5"`)
  }
}
