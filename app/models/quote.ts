// app/models/quote.ts
import { BaseModel, beforeSave, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import QuoteRow from '#models/quote_row'
import Contact from '#models/contact'
import type { ValidationStatus } from '#types/quote_type'

export default class Quote extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare reference: string

  @column()
  declare validationStatus: ValidationStatus

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

  @belongsTo(() => Contact)
  declare contact: BelongsTo<typeof Contact>

  @hasMany(() => QuoteRow)
  declare rows: HasMany<typeof QuoteRow>

  @beforeSave()
  static async updateAmount(quote: Quote) {
    if (quote.id) {
      await quote.load('rows')
      const total = quote.rows.reduce((t, row) => {
        return t + row.amount * row.quantity
      }, 0)
      quote.amount = total
    } else {
      quote.amount = 0
    }
  }
}
