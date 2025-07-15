import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Client from '#models/client'
import Quote from './quote.js'

export default class Contact extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare clientId: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare fullName: string

  @column()
  declare civility: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Client, { serializeAs: 'client' })
  declare client: BelongsTo<typeof Client>

  @hasMany(() => Quote, { serializeAs: 'quote' })
  declare quotes: HasMany<typeof Quote>
}
