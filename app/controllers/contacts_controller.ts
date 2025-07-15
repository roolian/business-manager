import type { HttpContext } from '@adonisjs/core/http'

import Contact from '#models/contact'
import { indexContactValidator, updateContactValidator } from '#validators/contact'
import Client from '#models/client'

export default class ContactsController {
  async index({ inertia, request }: HttpContext) {
    const queryParams = await request.validateUsing(indexContactValidator)

    const mainQuery = Contact.query().preload('client')
    if (queryParams.orderby && queryParams.direction) {
      mainQuery.orderBy(queryParams.orderby, queryParams.direction)
    } else {
      mainQuery.orderBy('createdAt', 'desc')
    }
    if (queryParams.s) {
      mainQuery.where('fullName', 'like', `%${queryParams.s}%`)
    }

    const models = await mainQuery.paginate(queryParams.page ?? 1, 8)
    const data = models.serialize()

    return inertia.render('contacts/index', { data, queryParams })
  }

  async create({ inertia }: HttpContext) {
    const clients: Client[] = await Client.all()
    return inertia.render('contacts/create', { clients })
  }

  async store({ response, request }: HttpContext) {
    const data = await request.validateUsing(updateContactValidator)
    await Contact.create(data)
    if (request.ajax()) {
      return response.redirect(request.headers().referer || '/contacts')
    }

    return response.redirect().toRoute('contacts.index')
  }

  async edit({ inertia, params }: HttpContext) {
    const clients: Client[] = await Client.all()
    const contact: Contact = await Contact.findOrFail(params.id)

    return inertia.render('contacts/edit', { contact, clients })
  }

  async update({ response, params, request }: HttpContext) {
    const data = await request.validateUsing(updateContactValidator)
    await Contact.query().where('id', params.id).update(data)
    if (request.ajax()) {
      return response.redirect(request.headers().referer || '/contacts')
    }
    return response.redirect().toRoute('contacts.edit', { id: params.id })
  }

  async delete({ response, params }: HttpContext) {
    const contact = await Contact.findOrFail(params.id)
    await contact.delete()

    return response.redirect().toRoute('contacts.index')
  }
}
