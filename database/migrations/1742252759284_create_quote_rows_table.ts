import { QuoteRowType } from '#types/quote_type'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'quote_rows'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('amount')
      table.float('quantity')
      table.integer('order')
      table.string('unit')
      table.text('description')
      table.enum('type', Object.values(QuoteRowType)).defaultTo('default')

      table.integer('quote_id').unsigned().references('id').inTable('quotes').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
