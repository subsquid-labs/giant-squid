module.exports = class Data1648303541148 {
  name = 'Data1648303541148'

  async up(db) {
    await db.query(`ALTER TABLE "account" ADD "last_update_block" numeric NOT NULL`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "account" DROP COLUMN "last_update_block"`)
  }
}
