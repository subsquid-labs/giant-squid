module.exports = class Data1644267180806 {
  name = 'Data1644267180806'

  async up(db) {
    await db.query(`ALTER TABLE "reward" DROP COLUMN "success"`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "reward" ADD "success" boolean`)
  }
}
