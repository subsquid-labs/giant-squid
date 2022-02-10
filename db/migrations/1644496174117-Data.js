module.exports = class Data1644496174117 {
  name = 'Data1644496174117'

  async up(db) {
    await db.query(`CREATE INDEX "IDX_c7f626a4ebde04b5e0c5b829a6" ON "crowdloan" ("chain_name") `)
    await db.query(`CREATE INDEX "IDX_9b160aadef096ecfb822596aaf" ON "contribution" ("chain_name") `)
    await db.query(`CREATE INDEX "IDX_082fbbbbe6a84c865abaa72817" ON "transfer" ("chain_name") `)
    await db.query(`CREATE INDEX "IDX_a76ad44e5c4b11502f6116db54" ON "reward" ("chain_name") `)
  }

  async down(db) {
    await db.query(`DROP INDEX "public"."IDX_c7f626a4ebde04b5e0c5b829a6"`)
    await db.query(`DROP INDEX "public"."IDX_9b160aadef096ecfb822596aaf"`)
    await db.query(`DROP INDEX "public"."IDX_082fbbbbe6a84c865abaa72817"`)
    await db.query(`DROP INDEX "public"."IDX_a76ad44e5c4b11502f6116db54"`)
  }
}
