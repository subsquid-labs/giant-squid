module.exports = class Data1644581902325 {
  name = 'Data1644581902325'

  async up(db) {
    await db.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    await db.query(`ALTER TABLE "contribution" DROP CONSTRAINT "PK_878330fa5bb34475732a5883d58"`)
    await db.query(`ALTER TABLE "contribution" DROP COLUMN "id"`)
    await db.query(`ALTER TABLE "contribution" ADD "id" character varying NOT NULL`)
    await db.query(`ALTER TABLE "contribution" ADD CONSTRAINT "PK_878330fa5bb34475732a5883d58" PRIMARY KEY ("id")`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295"`)
    await db.query(`ALTER TABLE "transfer" DROP COLUMN "id"`)
    await db.query(`ALTER TABLE "transfer" ADD "id" character varying NOT NULL`)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id")`)
    await db.query(`ALTER TABLE "reward" DROP CONSTRAINT "PK_a90ea606c229e380fb341838036"`)
    await db.query(`ALTER TABLE "reward" DROP COLUMN "id"`)
    await db.query(`ALTER TABLE "reward" ADD "id" character varying NOT NULL`)
    await db.query(`ALTER TABLE "reward" ADD CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id")`)
    await db.query(`CREATE INDEX "IDX_f9c2878a2b78726bd4db9edee4" ON "contribution" ("event_id") `)
    await db.query(`CREATE INDEX "IDX_b56c98c7f752bb9c88b7a5696a" ON "contribution" ("extrinsic_id") `)
    await db.query(`CREATE INDEX "IDX_2a4e1dce9f72514cd28f554ee2" ON "transfer" ("event_id") `)
    await db.query(`CREATE INDEX "IDX_06f5863364b6acc2e315ceba39" ON "transfer" ("extrinsic_id") `)
    await db.query(`CREATE INDEX "IDX_212058fe00a4e4ad6f43383399" ON "reward" ("event_id") `)
    await db.query(`CREATE INDEX "IDX_00fd800c7551b555933b7d1a1d" ON "reward" ("extrinsic_id") `)
  }

  async down(db) {
    await db.query(`ALTER TABLE "contribution" ADD CONSTRAINT "PK_878330fa5bb34475732a5883d58" PRIMARY KEY ("id")`)
    await db.query(`ALTER TABLE "contribution" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`)
    await db.query(`ALTER TABLE "contribution" DROP COLUMN "id"`)
    await db.query(`ALTER TABLE "contribution" DROP CONSTRAINT "PK_878330fa5bb34475732a5883d58"`)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id")`)
    await db.query(`ALTER TABLE "transfer" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`)
    await db.query(`ALTER TABLE "transfer" DROP COLUMN "id"`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295"`)
    await db.query(`ALTER TABLE "reward" ADD CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id")`)
    await db.query(`ALTER TABLE "reward" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`)
    await db.query(`ALTER TABLE "reward" DROP COLUMN "id"`)
    await db.query(`ALTER TABLE "reward" DROP CONSTRAINT "PK_a90ea606c229e380fb341838036"`)
    await db.query(`DROP INDEX "public"."IDX_f9c2878a2b78726bd4db9edee4"`)
    await db.query(`DROP INDEX "public"."IDX_b56c98c7f752bb9c88b7a5696a"`)
    await db.query(`DROP INDEX "public"."IDX_2a4e1dce9f72514cd28f554ee2"`)
    await db.query(`DROP INDEX "public"."IDX_06f5863364b6acc2e315ceba39"`)
    await db.query(`DROP INDEX "public"."IDX_212058fe00a4e4ad6f43383399"`)
    await db.query(`DROP INDEX "public"."IDX_00fd800c7551b555933b7d1a1d"`)
  }
}
