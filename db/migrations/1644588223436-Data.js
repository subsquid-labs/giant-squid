module.exports = class Data1644588223436 {
  name = 'Data1644588223436'

  async up(db) {
    await db.query(`DROP INDEX "public"."IDX_f9c2878a2b78726bd4db9edee4"`)
    await db.query(`DROP INDEX "public"."IDX_2a4e1dce9f72514cd28f554ee2"`)
    await db.query(`DROP INDEX "public"."IDX_212058fe00a4e4ad6f43383399"`)
    await db.query(`ALTER TABLE "contribution" DROP COLUMN "event_id"`)
    await db.query(`ALTER TABLE "transfer" DROP COLUMN "event_id"`)
    await db.query(`ALTER TABLE "reward" DROP COLUMN "event_id"`)
  }

  async down(db) {
    await db.query(`CREATE INDEX "IDX_f9c2878a2b78726bd4db9edee4" ON "contribution" ("event_id") `)
    await db.query(`CREATE INDEX "IDX_2a4e1dce9f72514cd28f554ee2" ON "transfer" ("event_id") `)
    await db.query(`CREATE INDEX "IDX_212058fe00a4e4ad6f43383399" ON "reward" ("event_id") `)
    await db.query(`ALTER TABLE "contribution" ADD "event_id" text`)
    await db.query(`ALTER TABLE "transfer" ADD "event_id" text`)
    await db.query(`ALTER TABLE "reward" ADD "event_id" text`)
  }
}
