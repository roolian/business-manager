import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Client from './client.js'
import Quote from './quote.js'
import Invoice from './invoice.js'
import type { ProjectType, ProjectStatus } from '#types/project_type'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare type: ProjectType

  @column()
  declare status: ProjectStatus

  @column()
  declare clientId: number

  @column.date()
  declare startDate: DateTime | null

  @column.date()
  declare endDate: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @hasMany(() => Quote)
  declare quotes: HasMany<typeof Quote>

  @hasMany(() => Invoice)
  declare invoices: HasMany<typeof Invoice>
}
