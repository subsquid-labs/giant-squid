module.exports = class Data1647863007636 {
  name = 'Data1647863007636'

  async up(db) {
    await db.query(`ALTER TABLE "crowdloan" DROP COLUMN "status"`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "crowdloan" ADD "status" character varying(9)`)
  }
}
