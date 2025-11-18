// app/validators/quote.ts
import { QuoteRowType, VALIDATION_STATUS } from '#types/quote_type'
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
    validationStatus: vine.enum(Object.values(VALIDATION_STATUS)),
    reference: vine.string().trim().optional(),
  })
)
export const updateQuoteRowsValidator = vine.compile(
  vine.object({
    rows: vine.array(
      vine.object({
        id: vine.number().optional(),
        description: vine.string().trim().optional(),
        amount: vine.number().min(0).optional().requiredIfExists(['quantity']),
        unit: vine.string().trim().optional(),
        quantity: vine.number().min(0).optional().requiredIfAnyExists(['amount']),
        type: vine.enum(Object.values(QuoteRowType)).optional(),
        order: vine.number(),
      })
    ),
  })
)
