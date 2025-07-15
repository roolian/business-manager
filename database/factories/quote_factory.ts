import Quote from '#models/quote'
import Factory from '@adonisjs/lucid/factories'
import { fakerFR as faker } from '@faker-js/faker'

export const QuoteFactory = Factory.define(Quote, async () => {
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
  }
}).build()
