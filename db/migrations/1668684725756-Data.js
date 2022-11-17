module.exports = class Data1668684725756 {
  name = 'Data1668684725756'

  async up(db) {
    await db.query(`ALTER TABLE "staker" RENAME COLUMN "unbondind_volume" TO "unbonding_volume"`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "staker" RENAME COLUMN "unbonding_volume" TO "unbondind_volume"`)
  }
}
