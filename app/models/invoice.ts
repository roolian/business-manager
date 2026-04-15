import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Project from './project.js'
import Quote from './quote.js'
import InvoiceRow from './invoice_row.js'
import type { InvoiceStatus } from '#types/invoice_type'

export default class Invoice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare reference: string

  @column()
  declare projectId: number

  @column()
  declare quoteId: number | null

  @column()
  declare status: InvoiceStatus

  @column.date()
  declare issueDate: DateTime | null

  @column.date()
  declare dueDate: DateTime | null

  @column()
  declare amount: number

  @column()
  declare totalAmount: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @belongsTo(() => Quote)
  declare quote: BelongsTo<typeof Quote>

  @hasMany(() => InvoiceRow)
  declare rows: HasMany<typeof InvoiceRow>

  @beforeSave()
  static async updateTotalAmount(invoice: Invoice) {
    if (invoice.id) {
      await invoice.load('rows')
      const total = invoice.rows.reduce((t, row) => {
        return t + row.amount * row.quantity
      }, 0)
      invoice.totalAmount = total
    } else {
      invoice.totalAmount = invoice.amount || 0
    }
  }

  static async generateReference(): Promise<string> {
    const now = new Date()
    const year = now.getFullYear().toString()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    
    // Find the last invoice for this month
    const lastInvoice = await this.query()
      .whereRaw("strftime('%Y%m', created_at) = ?", [year + month])
      .orderBy('reference', 'desc')
      .first()
    
    let increment = 1
    if (lastInvoice) {
      const lastRef = lastInvoice.reference
      const lastIncrement = parseInt(lastRef.split('-')[1])
      increment = lastIncrement + 1
    }
    
    return `${year}${month}-${increment.toString().padStart(3, '0')}`
  }
}
