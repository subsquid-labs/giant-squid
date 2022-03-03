module.exports = class Data1646335213730 {
  name = 'Data1646335213730'

  async up(db) {
    await db.query(`CREATE TABLE "slash" ("id" character varying NOT NULL, "chain_name" text, "date" TIMESTAMP WITH TIME ZONE, "block_number" numeric, "extrinsic_hash" text, "amount" numeric, "total" numeric, "name" text, "account_id" character varying, CONSTRAINT "PK_21170fe23f4bb830eaaff8bd4e9" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_c6f769bd779f0ea56bf439d88e" ON "slash" ("chain_name") `)
    await db.query(`CREATE INDEX "IDX_870249631facab51316526e589" ON "slash" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_11c194818d549fdd45eb5f4cbf" ON "slash" ("account_id") `)
    await db.query(`ALTER TABLE "account" ADD "total_slash" numeric`)
    await db.query(`ALTER TABLE "slash" ADD CONSTRAINT "FK_11c194818d549fdd45eb5f4cbf4" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "slash"`)
    await db.query(`DROP INDEX "public"."IDX_c6f769bd779f0ea56bf439d88e"`)
    await db.query(`DROP INDEX "public"."IDX_870249631facab51316526e589"`)
    await db.query(`DROP INDEX "public"."IDX_11c194818d549fdd45eb5f4cbf"`)
    await db.query(`ALTER TABLE "account" DROP COLUMN "total_slash"`)
    await db.query(`ALTER TABLE "slash" DROP CONSTRAINT "FK_11c194818d549fdd45eb5f4cbf4"`)
  }
}
