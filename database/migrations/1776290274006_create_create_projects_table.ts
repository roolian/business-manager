import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.string('name')
      table.text('description')
      table.enum('type', ['package', 'time_tracking', 'maintenance'])
      table.enum('status', ['active', 'completed', 'paused', 'cancelled'])
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE')
      table.date('start_date').nullable()
      table.date('end_date').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}