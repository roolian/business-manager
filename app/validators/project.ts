import vine from '@vinejs/vine'

export const indexProjectValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    orderby: vine.enum(['name', 'type', 'status', 'createdAt', 'updatedAt']).optional(),
    direction: vine.enum(['asc', 'desc']).optional(),
    s: vine.string().trim().optional(),
  })
)

export const updateProjectValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1),
    description: vine.string().trim().minLength(1),
    type: vine.enum(['package', 'time_tracking', 'maintenance']),
    status: vine.enum(['active', 'completed', 'paused', 'cancelled']),
    clientId: vine.number(),
    startDate: vine.date().optional(),
    endDate: vine.date().optional(),
  })
)
