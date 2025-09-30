// app/validators/quote.ts
import vine from '@vinejs/vine'

export const indexQuoteValidator = vine.compile(
  vine.object({
    orderby: vine.string().trim().optional(),
    direction: vine.enum(['asc', 'desc']).optional(),
    s: vine.string().trim().optional(),
    page: vine.number().optional(),
  })
)

export const updateQuoteValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    description: vine.string().trim(),
    contactId: vine.number(),
  })
)
export const updateQuoteRowsValidator = vine.compile(
  vine.object({
    rows: vine.array(
      vine.object({
        id: vine.number().optional(),
        description: vine.string().trim().optional(),
        amount: vine.number().min(0),
        unit: vine.string().trim(),
        quantity: vine.number().min(0),
      })
    ),
  })
)
