import type { HttpContext } from '@adonisjs/core/http'

import Client from '#models/client'
import { indexClientValidator, updateClientValidator } from '#validators/client'

export default class ClientsController {
  async index({ inertia, request }: HttpContext) {
    const queryParams = await request.validateUsing(indexClientValidator)

    const clientsQuery = Client.query()
    if (queryParams.orderby && queryParams.direction) {
      clientsQuery.orderBy(queryParams.orderby, queryParams.direction)
    }
    if (queryParams.s) {
      clientsQuery.where('name', 'like', `%${queryParams.s}%`)
    }

    const clients = await clientsQuery.paginate(queryParams.page ?? 1, 8)
    const clientsData = clients.serialize()
    console.log(queryParams)

    return inertia.render('clients/index', { clientsData, queryParams })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('clients/create')
  }

  async store({ response, request }: HttpContext) {
    const data = await request.validateUsing(updateClientValidator)
    const user = await Client.create(data)

    return response.redirect().toRoute('clients.index')
  }

  async edit({ inertia, params }: HttpContext) {
    const client = await Client.find(params.id)

    return inertia.render('clients/edit', { client })
  }

  async update({ response, params, request }: HttpContext) {
    const data = await request.validateUsing(updateClientValidator)
    await Client.query().where('id', params.id).update(data)

    return response.redirect().toRoute('clients.edit', { id: params.id })
  }

  async delete({ response, params }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    await client.delete()

    return response.redirect().toRoute('clients.index')
  }
}
