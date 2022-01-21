module.exports = class data1642772891006 {
  name = 'data1642772891006'

  async up(db) {
    await db.query(`CREATE TABLE "balance_transaction" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "block_hash" text NOT NULL, "block_number" integer NOT NULL, "extrinisic_hash" text, "event" text NOT NULL, "from" text, "to" text, "account" text, "amount" numeric, "balance_status" text, "free" numeric, "reserved" numeric, "chain_name" text NOT NULL, CONSTRAINT "PK_5e3fd7a79cf10c4cd192e5648dc" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_0638b7b8c4be92b8391f09679a" ON "balance_transaction" ("from") `)
    await db.query(`CREATE INDEX "IDX_5177d873ab23a8a0b52bcf05d1" ON "balance_transaction" ("to") `)
    await db.query(`CREATE INDEX "IDX_6e4b285078ae33ae8b3659d54f" ON "balance_transaction" ("account") `)
    await db.query(`CREATE TABLE "staking_transaction" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "block_hash" text NOT NULL, "block_number" integer NOT NULL, "extrinisic_hash" text, "event" text NOT NULL, "chain_name" text NOT NULL, "account" text NOT NULL, "amount" numeric NOT NULL, CONSTRAINT "PK_318d36d8af1801e2d1e79fdf6f0" PRIMARY KEY ("id"))`)
  }

  async down(db) {
    await db.query(`DROP TABLE "balance_transaction"`)
    await db.query(`DROP INDEX "public"."IDX_0638b7b8c4be92b8391f09679a"`)
    await db.query(`DROP INDEX "public"."IDX_5177d873ab23a8a0b52bcf05d1"`)
    await db.query(`DROP INDEX "public"."IDX_6e4b285078ae33ae8b3659d54f"`)
    await db.query(`DROP TABLE "staking_transaction"`)
  }
}
