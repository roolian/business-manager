import QuoteRow from '#models/quote_row'

export interface QuoteRowValues extends Partial<QuoteRow> {
  tempId?: number
}

export type QuoteRowFormValues = { rows: QuoteRowValues[] }

export interface Field {
  id: string
  label: string
  type: 'text' | 'number' | 'textarea'
}