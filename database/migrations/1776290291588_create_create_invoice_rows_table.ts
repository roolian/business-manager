import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invoice_rows'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.integer('invoice_id').unsigned().references('id').inTable('invoices').onDelete('CASCADE')
      table.text('description')
      table.decimal('quantity', 10, 2).defaultTo(1)
      table.decimal('unit_price', 10, 2).defaultTo(0)
      table.decimal('amount', 10, 2).defaultTo(0)
      table.enum('type', ['package', 'time_tracking', 'maintenance_fee'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}