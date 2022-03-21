module.exports = class Data1647859224019 {
  name = 'Data1647859224019'

  async up(db) {
    await db.query(`ALTER TABLE "parachain" ALTER COLUMN "name" DROP NOT NULL`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "parachain" ALTER COLUMN "name" SET NOT NULL`)
  }
}
