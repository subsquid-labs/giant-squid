module.exports = class Data1656368267520 {
  name = 'Data1656368267520'

  async up(db) {
    await db.query(`ALTER TABLE "era_nomination" DROP CONSTRAINT "FK_fc284e4e8adda73aa3e26b1bc80"`)
    await db.query(`ALTER TABLE "era_nomination" DROP CONSTRAINT "FK_8001c7914ea1cc7ebaf239b4433"`)
    await db.query(`CREATE TABLE "era_staker" ("id" character varying NOT NULL, "staker_id" character varying NOT NULL, "role" character varying(9) NOT NULL, "self_bonded" numeric NOT NULL, "total_bonded" numeric NOT NULL, "total_reward" numeric NOT NULL, "total_slash" numeric NOT NULL, "commission" integer, "era_id" character varying NOT NULL, CONSTRAINT "PK_3476860588278cfe927102186b6" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_db3082693cd9861527d1ab0185" ON "era_staker" ("staker_id") `)
    await db.query(`CREATE INDEX "IDX_73f758807f518c1dbd30b6a76d" ON "era_staker" ("era_id") `)
    await db.query(`ALTER TABLE "era_nomination" ADD CONSTRAINT "FK_fc284e4e8adda73aa3e26b1bc80" FOREIGN KEY ("nominator_id") REFERENCES "era_staker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "era_nomination" ADD CONSTRAINT "FK_8001c7914ea1cc7ebaf239b4433" FOREIGN KEY ("validator_id") REFERENCES "era_staker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "era_staker" ADD CONSTRAINT "FK_db3082693cd9861527d1ab01856" FOREIGN KEY ("staker_id") REFERENCES "staker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "era_staker" ADD CONSTRAINT "FK_73f758807f518c1dbd30b6a76d9" FOREIGN KEY ("era_id") REFERENCES "era"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "era_nomination" ADD CONSTRAINT "FK_fc284e4e8adda73aa3e26b1bc80" FOREIGN KEY ("nominator_id") REFERENCES "era_nominator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "era_nomination" ADD CONSTRAINT "FK_8001c7914ea1cc7ebaf239b4433" FOREIGN KEY ("validator_id") REFERENCES "era_validator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`DROP TABLE "era_staker"`)
    await db.query(`DROP INDEX "public"."IDX_db3082693cd9861527d1ab0185"`)
    await db.query(`DROP INDEX "public"."IDX_73f758807f518c1dbd30b6a76d"`)
    await db.query(`ALTER TABLE "era_nomination" DROP CONSTRAINT "FK_fc284e4e8adda73aa3e26b1bc80"`)
    await db.query(`ALTER TABLE "era_nomination" DROP CONSTRAINT "FK_8001c7914ea1cc7ebaf239b4433"`)
    await db.query(`ALTER TABLE "era_staker" DROP CONSTRAINT "FK_db3082693cd9861527d1ab01856"`)
    await db.query(`ALTER TABLE "era_staker" DROP CONSTRAINT "FK_73f758807f518c1dbd30b6a76d9"`)
  }
}
