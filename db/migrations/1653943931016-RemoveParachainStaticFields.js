module.exports = class RemoveParachainStaticFields1653943931016 {
  name = 'RemoveParachainStaticFields1653943931016'

  async up(db) {
    await db.query(`ALTER TABLE "parachain" DROP COLUMN "name"`)
    await db.query(`ALTER TABLE "parachain" DROP COLUMN "relay_chain"`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "parachain" ADD "name" text`)
    await db.query(`ALTER TABLE "parachain" ADD "relay_chain" text`)
  }
}
