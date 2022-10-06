module.exports = class Data1665089668435 {
  name = 'Data1665089668435'

  async up(db) {
    await db.query(`CREATE TABLE "xcm_transfer" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, "extrinsic_hash" text NOT NULL, "to" jsonb, "from" jsonb NOT NULL, "asset" jsonb NOT NULL, "type" character varying(12) NOT NULL, CONSTRAINT "PK_51dd82383f8ec7d2358b8df0859" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_766473f200d8c26e84ac2252d3" ON "xcm_transfer" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_40a2a3aa9f698a22c3d53ba555" ON "xcm_transfer" ("extrinsic_hash") `)
    await db.query(`ALTER TABLE "transfer" DROP COLUMN "to"`)
    await db.query(`ALTER TABLE "transfer" DROP COLUMN "from"`)
    await db.query(`ALTER TABLE "transfer" DROP COLUMN "asset"`)
    await db.query(`ALTER TABLE "transfer" DROP COLUMN "type"`)
    await db.query(`ALTER TABLE "transfer" ADD "from_id" character varying NOT NULL`)
    await db.query(`ALTER TABLE "transfer" ADD "to_id" character varying NOT NULL`)
    await db.query(`ALTER TABLE "transfer" ADD "amount" numeric NOT NULL`)
    await db.query(`ALTER TABLE "transfer" ALTER COLUMN "extrinsic_hash" DROP NOT NULL`)
    await db.query(`ALTER TABLE "slash" ALTER COLUMN "amount" SET NOT NULL`)
    await db.query(`ALTER TABLE "reward" ALTER COLUMN "amount" SET NOT NULL`)
    await db.query(`CREATE INDEX "IDX_70ff8b624c3118ac3a4862d22c" ON "transfer" ("timestamp") `)
    await db.query(`CREATE INDEX "IDX_76bdfed1a7eb27c6d8ecbb7349" ON "transfer" ("from_id") `)
    await db.query(`CREATE INDEX "IDX_0751309c66e97eac9ef1149362" ON "transfer" ("to_id") `)
    await db.query(`CREATE INDEX "IDX_f4007436c1b546ede08a4fd7ab" ON "transfer" ("amount") `)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496" FOREIGN KEY ("from_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_0751309c66e97eac9ef11493623" FOREIGN KEY ("to_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "xcm_transfer"`)
    await db.query(`DROP INDEX "public"."IDX_766473f200d8c26e84ac2252d3"`)
    await db.query(`DROP INDEX "public"."IDX_40a2a3aa9f698a22c3d53ba555"`)
    await db.query(`ALTER TABLE "transfer" ADD "to" jsonb`)
    await db.query(`ALTER TABLE "transfer" ADD "from" jsonb NOT NULL`)
    await db.query(`ALTER TABLE "transfer" ADD "asset" jsonb NOT NULL`)
    await db.query(`ALTER TABLE "transfer" ADD "type" character varying(12) NOT NULL`)
    await db.query(`ALTER TABLE "transfer" DROP COLUMN "from_id"`)
    await db.query(`ALTER TABLE "transfer" DROP COLUMN "to_id"`)
    await db.query(`ALTER TABLE "transfer" DROP COLUMN "amount"`)
    await db.query(`ALTER TABLE "transfer" ALTER COLUMN "extrinsic_hash" SET NOT NULL`)
    await db.query(`ALTER TABLE "slash" ALTER COLUMN "amount" DROP NOT NULL`)
    await db.query(`ALTER TABLE "reward" ALTER COLUMN "amount" DROP NOT NULL`)
    await db.query(`DROP INDEX "public"."IDX_70ff8b624c3118ac3a4862d22c"`)
    await db.query(`DROP INDEX "public"."IDX_76bdfed1a7eb27c6d8ecbb7349"`)
    await db.query(`DROP INDEX "public"."IDX_0751309c66e97eac9ef1149362"`)
    await db.query(`DROP INDEX "public"."IDX_f4007436c1b546ede08a4fd7ab"`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496"`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_0751309c66e97eac9ef11493623"`)
  }
}
