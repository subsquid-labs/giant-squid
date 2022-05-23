module.exports = class EraValidatorsNominatorsCount1651955291949 {
  name = 'EraValidatorsNominatorsCount1651955291949'

  async up(db) {
    await db.query(`ALTER TABLE "era" ADD "validators_count" integer NOT NULL`)
    await db.query(`ALTER TABLE "era" ADD "nominators_count" integer NOT NULL`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "era" DROP COLUMN "validators_count"`)
    await db.query(`ALTER TABLE "era" DROP COLUMN "nominators_count"`)
  }
}
