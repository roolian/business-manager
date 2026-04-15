import vine from '@vinejs/vine'

export const indexInvoiceValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    orderby: vine.enum(['reference', 'status', 'issueDate', 'dueDate', 'createdAt', 'updatedAt']).optional(),
    direction: vine.enum(['asc', 'desc']).optional(),
    s: vine.string().trim().optional(),
  })
)

export const updateInvoiceValidator = vine.compile(
  vine.object({
    quoteId: vine.number().optional(),
    status: vine.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']).optional(),
    issueDate: vine.date().optional(),
    dueDate: vine.date().optional(),
    amount: vine.number().min(0).optional(),
  })
)
