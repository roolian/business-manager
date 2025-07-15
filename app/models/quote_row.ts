import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Quote from '#models/quote'
import { DateTime } from 'luxon'

export default class QuoteRow extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare amount: number

  @column()
  declare quantity: number

  @column()
  declare unit: number

  @column()
  declare description: string

  @column()
  declare quoteId: number

  @belongsTo(() => Quote)
  declare quote: BelongsTo<typeof Quote>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
