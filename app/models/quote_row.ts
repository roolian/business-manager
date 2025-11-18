import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Quote from '#models/quote'
import { DateTime } from 'luxon'
import { QuoteRowType } from '#types/quote_type'

export default class QuoteRow extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare order: number

  @column()
  declare amount: number

  @column()
  declare quantity: number

  @column()
  declare unit: string

  @column()
  declare description: string

  @column()
  declare quoteId: number

  @column()
  declare type: QuoteRowType

  @belongsTo(() => Quote)
  declare quote: BelongsTo<typeof Quote>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
