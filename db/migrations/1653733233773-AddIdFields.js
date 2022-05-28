module.exports = class AddIdFields1653733233773 {
  name = 'AddIdFields1653733233773'

  async up(db) {
    await db.query(`ALTER TABLE "crowdloan" DROP CONSTRAINT "FK_005883fcd4519fa5ae88706b3a5"`)
    await db.query(`ALTER TABLE "crowdloan" ALTER COLUMN "parachain_id" SET NOT NULL`)
    await db.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_34a9b7747fbe547737724da5a3b"`)
    await db.query(`ALTER TABLE "contribution" ALTER COLUMN "crowdloan_id" SET NOT NULL`)
    await db.query(`ALTER TABLE "staking_info" DROP CONSTRAINT "FK_865eaa33992017a630e00234afe"`)
    await db.query(`ALTER TABLE "staking_info" ALTER COLUMN "payee_id" SET NOT NULL`)
    await db.query(`ALTER TABLE "crowdloan" ADD CONSTRAINT "FK_005883fcd4519fa5ae88706b3a5" FOREIGN KEY ("parachain_id") REFERENCES "parachain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_34a9b7747fbe547737724da5a3b" FOREIGN KEY ("crowdloan_id") REFERENCES "crowdloan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "staking_info" ADD CONSTRAINT "FK_865eaa33992017a630e00234afe" FOREIGN KEY ("payee_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "crowdloan" ADD CONSTRAINT "FK_005883fcd4519fa5ae88706b3a5" FOREIGN KEY ("parachain_id") REFERENCES "parachain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "crowdloan" ALTER COLUMN "parachain_id" DROP NOT NULL`)
    await db.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_34a9b7747fbe547737724da5a3b" FOREIGN KEY ("crowdloan_id") REFERENCES "crowdloan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "contribution" ALTER COLUMN "crowdloan_id" DROP NOT NULL`)
    await db.query(`ALTER TABLE "staking_info" ADD CONSTRAINT "FK_865eaa33992017a630e00234afe" FOREIGN KEY ("payee_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "staking_info" ALTER COLUMN "payee_id" DROP NOT NULL`)
    await db.query(`ALTER TABLE "crowdloan" DROP CONSTRAINT "FK_005883fcd4519fa5ae88706b3a5"`)
    await db.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_34a9b7747fbe547737724da5a3b"`)
    await db.query(`ALTER TABLE "staking_info" DROP CONSTRAINT "FK_865eaa33992017a630e00234afe"`)
  }
}
