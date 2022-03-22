module.exports = class Data1647938133002 {
  name = 'Data1647938133002'

  async up(db) {
    await db.query(`CREATE INDEX "IDX_d6624eacc30144ea97915fe846" ON "transfer" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_4b93a54e522c1bc423507342ec" ON "reward" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_a5f351552e2281736fe929ff4f" ON "slash" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_07e856cbfa8875c5b4b5d8c641" ON "stake" ("block_number") `)
  }

  async down(db) {
    await db.query(`DROP INDEX "public"."IDX_d6624eacc30144ea97915fe846"`)
    await db.query(`DROP INDEX "public"."IDX_4b93a54e522c1bc423507342ec"`)
    await db.query(`DROP INDEX "public"."IDX_a5f351552e2281736fe929ff4f"`)
    await db.query(`DROP INDEX "public"."IDX_07e856cbfa8875c5b4b5d8c641"`)
  }
}
