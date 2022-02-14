module.exports = class Data1644600611592 {
  name = 'Data1644600611592'

  async up(db) {
    await db.query(`DROP INDEX "public"."IDX_b56c98c7f752bb9c88b7a5696a"`)
    await db.query(`DROP INDEX "public"."IDX_06f5863364b6acc2e315ceba39"`)
    await db.query(`DROP INDEX "public"."IDX_00fd800c7551b555933b7d1a1d"`)
    await db.query(`ALTER TABLE "contribution" DROP COLUMN "extrinsic_id"`)
    await db.query(`ALTER TABLE "transfer" DROP COLUMN "extrinsic_id"`)
    await db.query(`ALTER TABLE "reward" DROP COLUMN "extrinsic_id"`)
    await db.query(`CREATE INDEX "IDX_61377c288f7b49300c2c871032" ON "contribution" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_070c555a86b0b41a534a55a659" ON "transfer" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_51b4a3885904fbbc1296944ca4" ON "reward" ("extrinsic_hash") `)
  }

  async down(db) {
    await db.query(`CREATE INDEX "IDX_b56c98c7f752bb9c88b7a5696a" ON "contribution" ("extrinsic_id") `)
    await db.query(`CREATE INDEX "IDX_f9c2878a2b78726bd4db9edee4" ON "contribution" ("event_id") `)
    await db.query(`CREATE INDEX "IDX_06f5863364b6acc2e315ceba39" ON "transfer" ("extrinsic_id") `)
    await db.query(`CREATE INDEX "IDX_2a4e1dce9f72514cd28f554ee2" ON "transfer" ("event_id") `)
    await db.query(`CREATE INDEX "IDX_00fd800c7551b555933b7d1a1d" ON "reward" ("extrinsic_id") `)
    await db.query(`CREATE INDEX "IDX_212058fe00a4e4ad6f43383399" ON "reward" ("event_id") `)
    await db.query(`ALTER TABLE "contribution" ADD "extrinsic_id" text`)
    await db.query(`ALTER TABLE "contribution" ADD "event_id" text`)
    await db.query(`ALTER TABLE "transfer" ADD "extrinsic_id" text`)
    await db.query(`ALTER TABLE "transfer" ADD "event_id" text`)
    await db.query(`ALTER TABLE "reward" ADD "extrinsic_id" text`)
    await db.query(`ALTER TABLE "reward" ADD "event_id" text`)
    await db.query(`DROP INDEX "public"."IDX_61377c288f7b49300c2c871032"`)
    await db.query(`DROP INDEX "public"."IDX_070c555a86b0b41a534a55a659"`)
    await db.query(`DROP INDEX "public"."IDX_51b4a3885904fbbc1296944ca4"`)
  }
}
