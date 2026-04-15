import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

import Invoice from '#models/invoice'
import Project from '#models/project'
import Quote from '#models/quote'
import { indexInvoiceValidator, updateInvoiceValidator } from '#validators/invoice'

export default class InvoicesController {
  async index({ inertia, request }: HttpContext) {
    const queryParams = await request.validateUsing(indexInvoiceValidator)

    const invoicesQuery = Invoice.query()
    if (queryParams.orderby && queryParams.direction) {
      invoicesQuery.orderBy(queryParams.orderby, queryParams.direction)
    } else {
      invoicesQuery.orderBy('createdAt', 'desc')
    }
    if (queryParams.s) {
      invoicesQuery.where('reference', 'like', `%${queryParams.s}%`)
    }

    const invoices = await invoicesQuery.paginate(queryParams.page ?? 1, 8)
    const invoicesData = invoices.serialize()

    return inertia.render('invoices/index', { invoicesData, queryParams })
  }

  async create({ inertia, params }: HttpContext) {
    const projectId = params.projectId
    let project = null
    if(projectId) {
      project = await Project.findOrFail(projectId)
      await project.load('client')
      const quotes = await Quote.query().where('projectId', projectId).where('validationStatus', 'accepted')

      return inertia.render('invoices/create', { project, quotes })

    }
    
    
    return inertia.render('invoices/create', { })    
  }

  async store({ response, request, params }: HttpContext) {
    const data = await request.validateUsing(updateInvoiceValidator)
    
    // Generate reference automatically
    data.reference = await Invoice.generateReference()
    data.projectId = params.projectId
    
    await Invoice.create(data)

    return response.redirect().toRoute('projects.edit', { id: params.projectId })
  }

  async edit({ inertia, params }: HttpContext) {
    const invoice = await Invoice.findOrFail(params.id)
    // Skip loading for now to avoid type issues
    //await invoice.load('project')
    await invoice.load('quote') 
    await invoice.load('rows')

    // Get project separately to avoid loading issues
    const project = await Project.findOrFail(invoice.projectId)
    const quotes = await Quote.query().where('projectId', project.id).where('validationStatus', 'accepted')

    return inertia.render('invoices/edit', { invoice, project, quotes })
  }

  async update({ response, params, request }: HttpContext) {
    const data = await request.validateUsing(updateInvoiceValidator)
    await Invoice.query().where('id', params.id).update(data)

    return response.redirect().toRoute('invoices.edit', { id: params.id })
  }

  async delete({ response, params }: HttpContext) {
    const invoice = await Invoice.findOrFail(params.id)
    const projectId = invoice.projectId
    await invoice.delete()

    return response.redirect().toRoute('projects.edit', { id: projectId })
  }

  async generateNextMaintenanceInvoice({ response, params }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    
    if (project.type !== 'maintenance') {
      return response.badRequest({ error: 'Project must be of maintenance type' })
    }

    const reference = await Invoice.generateReference()
    
    await Invoice.create({
      reference,
      projectId: project.id,
      quoteId: null,
      status: 'draft',
      issueDate: DateTime.now(),
      dueDate: DateTime.now().plus({ days: 30 }),
      amount: 0,
      totalAmount: 0,
    })

    return response.redirect().toRoute('projects.edit', { id: project.id })
  }
}
