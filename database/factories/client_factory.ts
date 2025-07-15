import Client from '#models/client'
import Factory from '@adonisjs/lucid/factories'
import { fakerFR as faker } from '@faker-js/faker'
import string from '@adonisjs/core/helpers/string'
import { ContactFactory } from './contact_factory.js'

export const ClientFactory = Factory.define(Client, () => {
  const name = faker.company.name()

  return {
    name: name,
    address: faker.location.streetAddress(),
    postalCode: faker.location.zipCode(),
    city: faker.location.city(),
    country: 'FR',
    dailyRate: 500,
    slug: string.slug(name),
  }
})
  .relation('contacts', () => ContactFactory) // 👈
  .build()
