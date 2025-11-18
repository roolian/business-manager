// app/controllers/quotes_controller.ts
import type { HttpContext } from '@adonisjs/core/http'

import {
  indexQuoteValidator,
  updateQuoteRowsValidator,
  updateQuoteValidator,
} from '#validators/quote'
import string from '@adonisjs/core/helpers/string'
import db from '@adonisjs/lucid/services/db'
import Contact from '#models/contact'
import QuoteRow from '#models/quote_row'
import Quote from '#models/quote'
import _ from 'lodash'

export default class QuotesController {
  async index({ inertia, request }: HttpContext) {
    const queryParams = await request.validateUsing(indexQuoteValidator)

    /*const mainQuery = Quote.query().preload('contact', (contactQuery) => {
      contactQuery.preload('client')
    })*/

    const mainQuery = db
      .query()
      .select(
        'quote.* ',
        'quote.id as quote.id',
        'contact.first_name as contact.firstName',
        'contact.last_name as contact.lastName',
        'client.name as client.name'
      )
      .from('quotes as quote')
      .leftJoin('contacts as contact', 'quote.contact_id', '=', 'contact.id')
      .leftJoin('clients as client', 'client.id', '=', 'contact.client_id')

    if (queryParams.orderby && queryParams.direction) {
      const orderBy = queryParams.orderby
        .split('.')
        .map((column) => string.snakeCase(column))
        .join('.')

      mainQuery.orderByRaw(`${orderBy} ${queryParams.direction.toUpperCase()}`)
    }

    if (queryParams.s) {
      mainQuery.where('contact.firstName', 'like', `%${queryParams.s}%`)
    }

    const quotes = await mainQuery.paginate(queryParams.page ?? 1, 8)
    const quotesData = quotes.toJSON()

    return inertia.render('quotes/index', { quotesData, queryParams })
  }

  async create({ inertia }: HttpContext) {
    const contacts: Contact[] = await Contact.query()
      .preload('client')
      .join('clients', 'clients.id', 'contacts.client_id')
      .orderBy('clients.name', 'asc')
      .orderBy('contacts.last_name', 'asc')
    return inertia.render('quotes/create', { contacts })
  }

  async store({ response, request }: HttpContext) {
    const data = await request.validateUsing(updateQuoteValidator)
    await Quote.create(data)

    return response.redirect().toRoute('quotes.index')
  }

  async edit({ inertia, params }: HttpContext) {
    const quote = await Quote.query()
      .where('id', params.id)
      .preload('rows')
      .preload('contact' as any, (contactQuery: any) => {
        contactQuery.preload('client')
      })
      .firstOrFail()

    const contacts: Contact[] = await Contact.query()
      .preload('client')
      .join('clients', 'clients.id', 'contacts.client_id')
      .orderBy('clients.name', 'asc')
      .orderBy('contacts.last_name', 'asc')
      .select('contacts.*')

    return inertia.render('quotes/edit', { quote, contacts })
  }

  async update({ response, params, request }: HttpContext) {
    const data = await request.validateUsing(updateQuoteValidator)
    await Quote.query().where('id', params.id).update({
      title: data.title,
      description: data.description,
      contactId: data.contactId,
      validationStatus: data.validationStatus,
      reference: data.reference,
    })

    return response.redirect().toRoute('quotes.edit', { id: params.id })
  }

  async updateRows({ response, params, request }: HttpContext) {
    const data = await request.validateUsing(updateQuoteRowsValidator)
    data.rows.forEach(async (row) => {
      if (row.id) {
        await QuoteRow.query()
          .where('id', row.id)
          .update(_.omit(row, ['id']))
      } else {
        await QuoteRow.create({ ...row, quoteId: params.id })
      }
    })

    const quote = await Quote.findOrFail(params.id)
    await quote.save()

    return response.redirect().toRoute('quotes.edit', { id: params.id })
  }

  async deleteRow({ response, params }: HttpContext) {
    const quoteRow = await QuoteRow.findOrFail(params.rowId)
    await quoteRow.delete()

    return response.redirect().toRoute('quotes.edit', { id: params.id })
  }

  async delete({ response, params }: HttpContext) {
    const quote = await Quote.findOrFail(params.id)
    await quote.delete()

    return response.redirect().toRoute('quotes.index')
  }
}
