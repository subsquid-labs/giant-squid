module.exports = class Data1644055207159 {
  name = 'Data1644055207159'

  async up(db) {
    await db.query(`CREATE TABLE "balance_event" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "block_hash" text NOT NULL, "block_number" numeric NOT NULL, "extrinisic_hash" text, "event" text NOT NULL, "from" text, "to" text, "account" text, "amount" numeric, "balance_status" text, "free" numeric, "reserved" numeric, "chain_name" text NOT NULL, CONSTRAINT "PK_0441ed630ab473892b49014afc4" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_eb453f7eeaf22e81fee9caf1e0" ON "balance_event" ("from") `)
    await db.query(`CREATE INDEX "IDX_5fce1583c28e49a1fb6ceda388" ON "balance_event" ("to") `)
    await db.query(`CREATE INDEX "IDX_2891e0b50b4488796227c555da" ON "balance_event" ("account") `)
    await db.query(`CREATE INDEX "IDX_46f35fe9bd717122daa2a3c83f" ON "balance_event" ("chain_name") `)
    await db.query(`CREATE TABLE "staking_event" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "block_hash" text NOT NULL, "block_number" numeric NOT NULL, "extrinisic_hash" text, "event" text NOT NULL, "chain_name" text NOT NULL, "account" text NOT NULL, "amount" numeric NOT NULL, CONSTRAINT "PK_c4f2c390140b9ff847dae450025" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_9a6128288c3ff351c3a416070e" ON "staking_event" ("chain_name") `)
    await db.query(`CREATE INDEX "IDX_5761fdeb73df3dbeb078b3a7a3" ON "staking_event" ("account") `)
    await db.query(`CREATE TABLE "parachain" ("id" character varying NOT NULL, "name" text, CONSTRAINT "PK_0f6ac85862a6ca7c8873f699b61" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "crowdloan" ("id" character varying NOT NULL, "cap" numeric, "first_period" numeric, "last_period" numeric, "end" numeric, "contributors" text array, "raised" numeric, "parachain_id" character varying, CONSTRAINT "PK_19a05e349701577c8c1679ae84d" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_005883fcd4519fa5ae88706b3a" ON "crowdloan" ("parachain_id") `)
    await db.query(`CREATE TABLE "crowdloan_event" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "block_hash" text NOT NULL, "block_number" numeric NOT NULL, "extrinisic_hash" text, "event" text NOT NULL, "chain_name" text NOT NULL, "amount" numeric NOT NULL, "crowdloan_id" character varying NOT NULL, CONSTRAINT "PK_ba62476a79f3fa26a0f2f1896a8" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_42890a25955a0909e38b8f4ab0" ON "crowdloan_event" ("crowdloan_id") `)
    await db.query(`ALTER TABLE "crowdloan" ADD CONSTRAINT "FK_005883fcd4519fa5ae88706b3a5" FOREIGN KEY ("parachain_id") REFERENCES "parachain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "crowdloan_event" ADD CONSTRAINT "FK_42890a25955a0909e38b8f4ab07" FOREIGN KEY ("crowdloan_id") REFERENCES "crowdloan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "balance_event"`)
    await db.query(`DROP INDEX "public"."IDX_eb453f7eeaf22e81fee9caf1e0"`)
    await db.query(`DROP INDEX "public"."IDX_5fce1583c28e49a1fb6ceda388"`)
    await db.query(`DROP INDEX "public"."IDX_2891e0b50b4488796227c555da"`)
    await db.query(`DROP INDEX "public"."IDX_46f35fe9bd717122daa2a3c83f"`)
    await db.query(`DROP TABLE "staking_event"`)
    await db.query(`DROP INDEX "public"."IDX_9a6128288c3ff351c3a416070e"`)
    await db.query(`DROP INDEX "public"."IDX_5761fdeb73df3dbeb078b3a7a3"`)
    await db.query(`DROP TABLE "parachain"`)
    await db.query(`DROP TABLE "crowdloan"`)
    await db.query(`DROP INDEX "public"."IDX_005883fcd4519fa5ae88706b3a"`)
    await db.query(`DROP TABLE "crowdloan_event"`)
    await db.query(`DROP INDEX "public"."IDX_42890a25955a0909e38b8f4ab0"`)
    await db.query(`ALTER TABLE "crowdloan" DROP CONSTRAINT "FK_005883fcd4519fa5ae88706b3a5"`)
    await db.query(`ALTER TABLE "crowdloan_event" DROP CONSTRAINT "FK_42890a25955a0909e38b8f4ab07"`)
  }
}
