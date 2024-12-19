import { ClientFactory } from '#database/factories/clients'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await ClientFactory.createMany(120)
  }
}
