module.exports = class Data1648285306066 {
  name = 'Data1648285306066'

  async up(db) {
    await db.query(`ALTER TABLE "account" ADD "staking_info" jsonb NOT NULL`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "account" DROP COLUMN "staking_info"`)
  }
}
