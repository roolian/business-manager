export const INVOICE_STATUS = {
  DRAFT: 'draft',
  SENT: 'sent',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled',
} as const

export type InvoiceStatus = (typeof INVOICE_STATUS)[keyof typeof INVOICE_STATUS]

export const INVOICE_ROW_TYPE = {
  PACKAGE: 'package',
  TIME_TRACKING: 'time_tracking',
  MAINTENANCE_FEE: 'maintenance_fee',
} as const

export type InvoiceRowType = (typeof INVOICE_ROW_TYPE)[keyof typeof INVOICE_ROW_TYPE]
