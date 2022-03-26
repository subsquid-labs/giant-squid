module.exports = class Data1648305301997 {
  name = 'Data1648305301997'

  async up(db) {
    await db.query(`ALTER TABLE "slash" ADD "era" integer`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "slash" DROP COLUMN "era"`)
  }
}
