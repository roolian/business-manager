import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Contact from './contact.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare address: string

  @column()
  declare city: string

  @column()
  declare postalCode: string

  @column()
  declare country: string

  @column()
  declare slug: string

  @column()
  declare dailyRate: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Contact)
  declare contacts: HasMany<typeof Contact>
}
