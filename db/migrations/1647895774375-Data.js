module.exports = class Data1647895774375 {
  name = 'Data1647895774375'

  async up(db) {
    await db.query(`ALTER TABLE "account" ALTER COLUMN "total_stake" SET NOT NULL`)
    await db.query(`ALTER TABLE "account" ALTER COLUMN "total_reward" SET NOT NULL`)
    await db.query(`ALTER TABLE "account" ALTER COLUMN "total_slash" SET NOT NULL`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "account" ALTER COLUMN "total_stake" DROP NOT NULL`)
    await db.query(`ALTER TABLE "account" ALTER COLUMN "total_reward" DROP NOT NULL`)
    await db.query(`ALTER TABLE "account" ALTER COLUMN "total_slash" DROP NOT NULL`)
  }
}
