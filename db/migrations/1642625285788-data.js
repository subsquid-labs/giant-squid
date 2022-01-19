module.exports = class data1642625285788 {
  name = 'data1642625285788'

  async up(db) {
    await db.query(`ALTER TABLE "balance_transaction" DROP COLUMN "data"`)
    await db.query(`ALTER TABLE "balance_transaction" ADD "from" text`)
    await db.query(`ALTER TABLE "balance_transaction" ADD "to" text`)
    await db.query(`ALTER TABLE "balance_transaction" ADD "account" text`)
    await db.query(`ALTER TABLE "balance_transaction" ADD "amount" numeric`)
    await db.query(`ALTER TABLE "balance_transaction" ADD "status" text`)
    await db.query(`ALTER TABLE "balance_transaction" ADD "free" numeric`)
    await db.query(`ALTER TABLE "balance_transaction" ADD "reserved" numeric`)
    await db.query(`CREATE INDEX "IDX_0638b7b8c4be92b8391f09679a" ON "balance_transaction" ("from") `)
    await db.query(`CREATE INDEX "IDX_5177d873ab23a8a0b52bcf05d1" ON "balance_transaction" ("to") `)
    await db.query(`CREATE INDEX "IDX_6e4b285078ae33ae8b3659d54f" ON "balance_transaction" ("account") `)
  }

  async down(db) {
    await db.query(`ALTER TABLE "balance_transaction" ADD "data" jsonb`)
    await db.query(`ALTER TABLE "balance_transaction" DROP COLUMN "from"`)
    await db.query(`ALTER TABLE "balance_transaction" DROP COLUMN "to"`)
    await db.query(`ALTER TABLE "balance_transaction" DROP COLUMN "account"`)
    await db.query(`ALTER TABLE "balance_transaction" DROP COLUMN "amount"`)
    await db.query(`ALTER TABLE "balance_transaction" DROP COLUMN "status"`)
    await db.query(`ALTER TABLE "balance_transaction" DROP COLUMN "free"`)
    await db.query(`ALTER TABLE "balance_transaction" DROP COLUMN "reserved"`)
    await db.query(`DROP INDEX "public"."IDX_0638b7b8c4be92b8391f09679a"`)
    await db.query(`DROP INDEX "public"."IDX_5177d873ab23a8a0b52bcf05d1"`)
    await db.query(`DROP INDEX "public"."IDX_6e4b285078ae33ae8b3659d54f"`)
  }
}
