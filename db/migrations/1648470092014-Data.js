module.exports = class Data1648470092014 {
  name = 'Data1648470092014'

  async up(db) {
    await db.query(`ALTER TABLE "account" ALTER COLUMN "staking_info" DROP NOT NULL`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "account" ALTER COLUMN "staking_info" SET NOT NULL`)
  }
}
