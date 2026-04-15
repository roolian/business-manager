import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invoices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.string('reference').unique()
      table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE')
      table.integer('quote_id').unsigned().references('id').inTable('quotes').onDelete('SET NULL').nullable()
      table.enum('status', ['draft', 'sent', 'paid', 'overdue', 'cancelled'])
      table.date('issue_date').nullable()
      table.date('due_date').nullable()
      table.decimal('amount', 10, 2).defaultTo(0)
      table.decimal('total_amount', 10, 2).defaultTo(0)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}