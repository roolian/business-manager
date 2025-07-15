import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'quote_rows'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('amount')
      table.float('quantity')
      table.float('unit')
      table.float('description')

      table.integer('quote_id').unsigned().references('id').inTable('quotes').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
