module.exports = class Data1646161135408 {
  name = 'Data1646161135408'

  async up(db) {
    await db.query(`ALTER TABLE "stake" ADD "success" boolean`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "stake" DROP COLUMN "success"`)
  }
}
