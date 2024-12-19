import Client from '#models/client'
import Factory from '@adonisjs/lucid/factories'
import { fakerFR as faker } from '@faker-js/faker';

export const ClientFactory = Factory.define(Client, () => {
  return {
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    postalCode: faker.location.zipCode(),
    city: faker.location.city(),
  }
}).build()
