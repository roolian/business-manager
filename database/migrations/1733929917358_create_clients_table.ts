import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('reference').unique()
      table.string('name')
      table.string('address')
      table.string('city')
      table.string('country')
      table.string('postal_code')
      table.string('slug')
      table.float('daily_rate', 10, 2)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
