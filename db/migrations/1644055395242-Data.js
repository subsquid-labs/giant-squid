module.exports = class Data1644055395242 {
  name = 'Data1644055395242'

  async up(db) {
    await db.query(`CREATE TABLE "contribution" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "block_hash" text NOT NULL, "block_number" numeric NOT NULL, "extrinisic_hash" text, "event" text NOT NULL, "chain_name" text NOT NULL, "amount" numeric NOT NULL, "crowdloan_id" character varying NOT NULL, CONSTRAINT "PK_878330fa5bb34475732a5883d58" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_34a9b7747fbe547737724da5a3" ON "contribution" ("crowdloan_id") `)
    await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "block_number" numeric, "extrinisic_hash" text, "to" text, "from" text, "amount" numeric, "fee" numeric, "success" boolean, "name" text, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_4cbc37e8c3b47ded161f44c24f" ON "transfer" ("to") `)
    await db.query(`CREATE INDEX "IDX_be54ea276e0f665ffc38630fc0" ON "transfer" ("from") `)
    await db.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_34a9b7747fbe547737724da5a3b" FOREIGN KEY ("crowdloan_id") REFERENCES "crowdloan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "contribution"`)
    await db.query(`DROP INDEX "public"."IDX_34a9b7747fbe547737724da5a3"`)
    await db.query(`DROP TABLE "transfer"`)
    await db.query(`DROP INDEX "public"."IDX_4cbc37e8c3b47ded161f44c24f"`)
    await db.query(`DROP INDEX "public"."IDX_be54ea276e0f665ffc38630fc0"`)
    await db.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_34a9b7747fbe547737724da5a3b"`)
  }
}
