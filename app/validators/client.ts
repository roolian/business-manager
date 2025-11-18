import vine from '@vinejs/vine'

export const indexClientValidator = vine.compile(
  vine.object({
    orderby: vine.string().trim().optional(),
    direction: vine.enum(['asc', 'desc']).optional(),
    page: vine.number().optional(),
    s: vine.string().trim().optional(),
  })
)

export const updateClientValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(6),
    reference: vine.string().trim().fixedLength(4).optional(),
    address: vine.string().trim().minLength(6),
    postalCode: vine.string().trim().minLength(5),
    city: vine.string().trim().minLength(1),
    dailyRate: vine.number().min(0),
    country: vine.string().trim().minLength(2),
  })
)
