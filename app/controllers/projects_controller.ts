import type { HttpContext } from '@adonisjs/core/http'

import Project from '#models/project'
import Client from '#models/client'
import { indexProjectValidator, updateProjectValidator } from '#validators/project'

export default class ProjectsController {
  async index({ inertia, request }: HttpContext) {
    const queryParams = await request.validateUsing(indexProjectValidator)

    const projectsQuery = Project.query().preload('client').preload('invoices')
    if (queryParams.orderby && queryParams.direction) {
      projectsQuery.orderBy(queryParams.orderby, queryParams.direction)
    } else {
      projectsQuery.orderBy('createdAt', 'desc')
    }
    if (queryParams.s) {
      projectsQuery.where('name', 'like', `%${queryParams.s}%`)
    }

    const projects = await projectsQuery.paginate(queryParams.page ?? 1, 8)
    const projectsData = projects.serialize()

    return inertia.render('projects/index', { projectsData, queryParams })
  }

  async create({ inertia }: HttpContext) {
    const clients = await Client.query().orderBy('name', 'asc')
    
    return inertia.render('projects/create', { clients })
  }

  async store({ response, request }: HttpContext) {
    const data = await request.validateUsing(updateProjectValidator)
    await Project.create(data)

    return response.redirect().toRoute('projects.index')
  }

  async edit({ inertia, params }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    await project.load('client')
    await project.load('quotes')
    await project.load('invoices')

    const clients = await Client.query().orderBy('name', 'asc')

    return inertia.render('projects/edit', { project, clients })
  }

  async update({ response, params, request }: HttpContext) {
    const data = await request.validateUsing(updateProjectValidator)
    await Project.query().where('id', params.id).update(data)

    return response.redirect().toRoute('projects.edit', { id: params.id })
  }

  async delete({ response, params }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    await project.delete()

    return response.redirect().toRoute('projects.index')
  }
}
