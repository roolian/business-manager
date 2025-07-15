import { ClientFactory } from '#database/factories/client_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await ClientFactory.with('contacts', 2, (contact) => contact.with('quotes', 2)).createMany(120)
  }
}
