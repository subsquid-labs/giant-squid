module.exports = class Data1644523892098 {
  name = 'Data1644523892098'

  async up(db) {
    await db.query(`ALTER TABLE "contribution" DROP CONSTRAINT "PK_878330fa5bb34475732a5883d58"`)
    await db.query(`ALTER TABLE "contribution" DROP COLUMN "id"`)
    await db.query(`ALTER TABLE "contribution" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`)
    await db.query(`ALTER TABLE "contribution" ADD CONSTRAINT "PK_878330fa5bb34475732a5883d58" PRIMARY KEY ("id")`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295"`)
    await db.query(`ALTER TABLE "transfer" DROP COLUMN "id"`)
    await db.query(`ALTER TABLE "transfer" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id")`)
    await db.query(`ALTER TABLE "reward" DROP CONSTRAINT "PK_a90ea606c229e380fb341838036"`)
    await db.query(`ALTER TABLE "reward" DROP COLUMN "id"`)
    await db.query(`ALTER TABLE "reward" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`)
    await db.query(`ALTER TABLE "reward" ADD CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id")`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "contribution" ADD CONSTRAINT "PK_878330fa5bb34475732a5883d58" PRIMARY KEY ("id")`)
    await db.query(`ALTER TABLE "contribution" ADD "id" character varying NOT NULL`)
    await db.query(`ALTER TABLE "contribution" DROP COLUMN "id"`)
    await db.query(`ALTER TABLE "contribution" DROP CONSTRAINT "PK_878330fa5bb34475732a5883d58"`)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id")`)
    await db.query(`ALTER TABLE "transfer" ADD "id" character varying NOT NULL`)
    await db.query(`ALTER TABLE "transfer" DROP COLUMN "id"`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295"`)
    await db.query(`ALTER TABLE "reward" ADD CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id")`)
    await db.query(`ALTER TABLE "reward" ADD "id" character varying NOT NULL`)
    await db.query(`ALTER TABLE "reward" DROP COLUMN "id"`)
    await db.query(`ALTER TABLE "reward" DROP CONSTRAINT "PK_a90ea606c229e380fb341838036"`)
  }
}
