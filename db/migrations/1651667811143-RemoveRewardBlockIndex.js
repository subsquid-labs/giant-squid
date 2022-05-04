module.exports = class RemoveRewardBlockIndex1651667811143 {
  name = 'RemoveRewardBlockIndex1651667811143'

  async up(db) {
    await db.query(`DROP INDEX "public"."IDX_4b93a54e522c1bc423507342ec"`)
  }

  async down(db) {
    await db.query(`CREATE INDEX "IDX_4b93a54e522c1bc423507342ec" ON "reward" ("block_number") `)
  }
}
