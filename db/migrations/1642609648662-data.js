module.exports = class data1642609648662 {
  name = 'data1642609648662'

  async up(db) {
    await db.query(`CREATE INDEX "IDX_46cd42163cf6a9d9d082dece61" ON "balance_transaction" ("data") `)
  }

  async down(db) {
    await db.query(`DROP INDEX "public"."IDX_46cd42163cf6a9d9d082dece61"`)
  }
}
