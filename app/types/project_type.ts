export const PROJECT_TYPE = {
  PACKAGE: 'package',
  TIME_TRACKING: 'time_tracking',
  MAINTENANCE: 'maintenance',
} as const

export type ProjectType = (typeof PROJECT_TYPE)[keyof typeof PROJECT_TYPE]

export const PROJECT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PAUSED: 'paused',
  CANCELLED: 'cancelled',
} as const

export type ProjectStatus = (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS]
