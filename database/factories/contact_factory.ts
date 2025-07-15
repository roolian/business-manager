import Contact from '#models/contact'
import Factory from '@adonisjs/lucid/factories'
import { fakerFR as faker } from '@faker-js/faker'
import { ClientFactory } from '#database/factories/client_factory'
import { QuoteFactory } from '#database/factories/quote_factory'

export const ContactFactory = Factory.define(Contact, () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    civility: faker.person.prefix(),
  }
})
  .relation('client', () => ClientFactory) // 👈
  .relation('quotes', () => QuoteFactory) // 👈
  .build()
