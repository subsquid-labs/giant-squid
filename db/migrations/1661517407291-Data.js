module.exports = class Data1661517407291 {
  name = 'Data1661517407291'

  async up(db) {
    await db.query(`ALTER TABLE "account_transfer" DROP CONSTRAINT "FK_d5240d17696e229585da974641a"`)
    await db.query(`ALTER TABLE "account_transfer" ALTER COLUMN "account_id" DROP NOT NULL`)
    await db.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_34a9b7747fbe547737724da5a3b"`)
    await db.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_1e238c006392e74f87e2db5bf9b"`)
    await db.query(`ALTER TABLE "contribution" ALTER COLUMN "crowdloan_id" DROP NOT NULL`)
    await db.query(`ALTER TABLE "contribution" ALTER COLUMN "account_id" DROP NOT NULL`)
    await db.query(`ALTER TABLE "era_nomination" DROP CONSTRAINT "FK_8d0f2c79f04ed0571d6d8f3f1c5"`)
    await db.query(`ALTER TABLE "era_nomination" ALTER COLUMN "era_id" DROP NOT NULL`)
    await db.query(`ALTER TABLE "era_staker" DROP CONSTRAINT "FK_73f758807f518c1dbd30b6a76d9"`)
    await db.query(`ALTER TABLE "era_staker" ALTER COLUMN "era_id" DROP NOT NULL`)
    await db.query(`ALTER TABLE "account_transfer" ADD CONSTRAINT "FK_d5240d17696e229585da974641a" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_34a9b7747fbe547737724da5a3b" FOREIGN KEY ("crowdloan_id") REFERENCES "crowdloan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_1e238c006392e74f87e2db5bf9b" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "era_nomination" ADD CONSTRAINT "FK_8d0f2c79f04ed0571d6d8f3f1c5" FOREIGN KEY ("era_id") REFERENCES "era"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "era_staker" ADD CONSTRAINT "FK_73f758807f518c1dbd30b6a76d9" FOREIGN KEY ("era_id") REFERENCES "era"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "account_transfer" ADD CONSTRAINT "FK_d5240d17696e229585da974641a" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "account_transfer" ALTER COLUMN "account_id" SET NOT NULL`)
    await db.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_34a9b7747fbe547737724da5a3b" FOREIGN KEY ("crowdloan_id") REFERENCES "crowdloan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_1e238c006392e74f87e2db5bf9b" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "contribution" ALTER COLUMN "crowdloan_id" SET NOT NULL`)
    await db.query(`ALTER TABLE "contribution" ALTER COLUMN "account_id" SET NOT NULL`)
    await db.query(`ALTER TABLE "era_nomination" ADD CONSTRAINT "FK_8d0f2c79f04ed0571d6d8f3f1c5" FOREIGN KEY ("era_id") REFERENCES "era"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "era_nomination" ALTER COLUMN "era_id" SET NOT NULL`)
    await db.query(`ALTER TABLE "era_staker" ADD CONSTRAINT "FK_73f758807f518c1dbd30b6a76d9" FOREIGN KEY ("era_id") REFERENCES "era"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "era_staker" ALTER COLUMN "era_id" SET NOT NULL`)
    await db.query(`ALTER TABLE "account_transfer" DROP CONSTRAINT "FK_d5240d17696e229585da974641a"`)
    await db.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_34a9b7747fbe547737724da5a3b"`)
    await db.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_1e238c006392e74f87e2db5bf9b"`)
    await db.query(`ALTER TABLE "era_nomination" DROP CONSTRAINT "FK_8d0f2c79f04ed0571d6d8f3f1c5"`)
    await db.query(`ALTER TABLE "era_staker" DROP CONSTRAINT "FK_73f758807f518c1dbd30b6a76d9"`)
  }
}
