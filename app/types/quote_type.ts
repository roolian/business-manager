export const VALIDATION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const
export type ValidationStatus = (typeof VALIDATION_STATUS)[keyof typeof VALIDATION_STATUS]

export enum QuoteRowType {
  HEADING = 'heading',
  DEFAULT = 'default',
}
