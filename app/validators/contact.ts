import vine from '@vinejs/vine'

export const indexContactValidator = vine.compile(
  vine.object({
    orderby: vine.string().trim().optional(),
    direction: vine.enum(['asc', 'desc']).optional(),
    page: vine.number().optional(),
    s: vine.string().trim().optional(),
  })
)

export const updateContactValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(1),
    lastName: vine.string().trim().minLength(1),
    civility: vine.string().trim().maxLength(8),
    clientId: vine.number(),
  })
)
