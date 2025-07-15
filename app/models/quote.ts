// app/models/quote.ts
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Contact from './contact.js'
import { DateTime } from 'luxon'
import QuoteRow from '#models/quote_row'

export default class Quote extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare contactId: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare amount: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Contact, { serializeAs: 'contact' })
  declare contact: BelongsTo<typeof Contact>

  @hasMany(() => QuoteRow)
  declare rows: HasMany<typeof QuoteRow>
}
