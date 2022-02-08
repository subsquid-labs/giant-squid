module.exports = class Data1644352119924 {
  name = 'Data1644352119924'

  async up(db) {
    await db.query(`CREATE TABLE "crowdloan" ("id" character varying NOT NULL, "cap" numeric NOT NULL, "first_period" numeric NOT NULL, "last_period" numeric NOT NULL, "end" numeric NOT NULL, "contributors" text array, "raised" numeric NOT NULL, "chain_name" text NOT NULL, "block_number" numeric, "parachain_id" character varying NOT NULL, CONSTRAINT "PK_19a05e349701577c8c1679ae84d" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_005883fcd4519fa5ae88706b3a" ON "crowdloan" ("parachain_id") `)
    await db.query(`CREATE TABLE "parachain" ("id" character varying NOT NULL, "name" text, CONSTRAINT "PK_0f6ac85862a6ca7c8873f699b61" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "contribution" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" numeric NOT NULL, "extrinisic_hash" text, "chain_name" text NOT NULL, "success" boolean NOT NULL, "account" text NOT NULL, "amount" numeric NOT NULL, "crowdloan_id" character varying NOT NULL, CONSTRAINT "PK_878330fa5bb34475732a5883d58" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_34a9b7747fbe547737724da5a3" ON "contribution" ("crowdloan_id") `)
    await db.query(`CREATE INDEX "IDX_0ae793de797f960ee329368a5e" ON "contribution" ("account") `)
    await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "block_number" numeric, "extrinisic_hash" text, "to" text, "from" text, "amount" numeric, "success" boolean, "name" text, "date" TIMESTAMP WITH TIME ZONE, "chain_name" text, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_4cbc37e8c3b47ded161f44c24f" ON "transfer" ("to") `)
    await db.query(`CREATE INDEX "IDX_be54ea276e0f665ffc38630fc0" ON "transfer" ("from") `)
    await db.query(`CREATE TABLE "reward" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE, "block_number" numeric, "extrinisic_hash" text, "chain_name" text, "account" text, "amount" numeric, "name" text, "era" integer, "validator" text, CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_b2d494a9fb70b08244806d2872" ON "reward" ("account") `)
    await db.query(`ALTER TABLE "crowdloan" ADD CONSTRAINT "FK_005883fcd4519fa5ae88706b3a5" FOREIGN KEY ("parachain_id") REFERENCES "parachain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_34a9b7747fbe547737724da5a3b" FOREIGN KEY ("crowdloan_id") REFERENCES "crowdloan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "crowdloan"`)
    await db.query(`DROP INDEX "public"."IDX_005883fcd4519fa5ae88706b3a"`)
    await db.query(`DROP TABLE "parachain"`)
    await db.query(`DROP TABLE "contribution"`)
    await db.query(`DROP INDEX "public"."IDX_34a9b7747fbe547737724da5a3"`)
    await db.query(`DROP INDEX "public"."IDX_0ae793de797f960ee329368a5e"`)
    await db.query(`DROP TABLE "transfer"`)
    await db.query(`DROP INDEX "public"."IDX_4cbc37e8c3b47ded161f44c24f"`)
    await db.query(`DROP INDEX "public"."IDX_be54ea276e0f665ffc38630fc0"`)
    await db.query(`DROP TABLE "reward"`)
    await db.query(`DROP INDEX "public"."IDX_b2d494a9fb70b08244806d2872"`)
    await db.query(`ALTER TABLE "crowdloan" DROP CONSTRAINT "FK_005883fcd4519fa5ae88706b3a5"`)
    await db.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_34a9b7747fbe547737724da5a3b"`)
  }
}
