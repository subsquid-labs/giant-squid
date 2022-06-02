module.exports = class BlockNumberAsInt1654110441904 {
  name = 'BlockNumberAsInt1654110441904'

  async up(db) {
    await db.query(`set statement_timeout to 120000`)
    await db.query(`DROP INDEX "public"."IDX_d6624eacc30144ea97915fe846"`)
    await db.query(`ALTER TABLE "transfer" ALTER COLUMN "block_number" TYPE integer`)
    await db.query(`ALTER TABLE "crowdloan" ALTER COLUMN "first_period" TYPE integer`)
    await db.query(`ALTER TABLE "crowdloan" ALTER COLUMN "last_period" TYPE integer`)
    await db.query(`ALTER TABLE "crowdloan" ALTER COLUMN "end" TYPE integer`)
    await db.query(`DROP INDEX "public"."IDX_6df781f6988651136911c74fd6"`)
    await db.query(`ALTER TABLE "crowdloan" ALTER COLUMN "block_number" TYPE integer`)
    await db.query(`DROP INDEX "public"."IDX_9b1ac330460a85067ef1c69299"`)
    await db.query(`ALTER TABLE "contribution" ALTER COLUMN "block_number" TYPE integer`)
    await db.query(`DROP INDEX "public"."IDX_4b93a54e522c1bc423507342ec"`)
    await db.query(`ALTER TABLE "reward" ALTER COLUMN "block_number" TYPE integer`)
    await db.query(`DROP INDEX "public"."IDX_a5f351552e2281736fe929ff4f"`)
    await db.query(`ALTER TABLE "slash" ALTER COLUMN "block_number" TYPE integer`)
    await db.query(`DROP INDEX "public"."IDX_b3ec1c99bd71224c6ef11cf5b0"`)
    await db.query(`ALTER TABLE "bond" ALTER COLUMN "block_number" TYPE integer`)
    await db.query(`ALTER TABLE "account" ALTER COLUMN "last_update_block" TYPE integer`)
    await db.query(`CREATE INDEX "IDX_d6624eacc30144ea97915fe846" ON "transfer" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_6df781f6988651136911c74fd6" ON "crowdloan" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_9b1ac330460a85067ef1c69299" ON "contribution" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_4b93a54e522c1bc423507342ec" ON "reward" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_a5f351552e2281736fe929ff4f" ON "slash" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_b3ec1c99bd71224c6ef11cf5b0" ON "bond" ("block_number") `)
  }

  async down(db) {
    await db.query(`DROP INDEX "IDX_d6624eacc30144ea97915fe846"`)
    await db.query(`DROP INDEX "IDX_6df781f6988651136911c74fd6"`)
    await db.query(`DROP INDEX "IDX_9b1ac330460a85067ef1c69299"`)
    await db.query(`DROP INDEX "IDX_4b93a54e522c1bc423507342ec"`)
    await db.query(`DROP INDEX "IDX_a5f351552e2281736fe929ff4f"`)
    await db.query(`DROP INDEX "IDX_b3ec1c99bd71224c6ef11cf5b0"`)
  }
}
