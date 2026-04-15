import { useState } from 'react'
import { FieldRow } from './FieldRow'
import { Button, Select } from 'flowbite-react'
import Project from '#models/project'
import Quote from '#models/quote'
import { Link } from '@inertiajs/react'
import { INVOICE_STATUS } from "#types/invoice_type"

export type InvoiceFormValues = {
  reference?: string
  projectId?: number
  quoteId?: number
  status?: string
  issueDate?: string
  dueDate?: string
  amount?: number
  totalAmount?: number
}

interface InvoiceFormProps {
  invoice?: any
  project?: Project
  quotes?: Quote[]
  onSubmit?: (values: InvoiceFormValues) => void
  className?: string
}

const InvoiceForm = ({ invoice, project, quotes, onSubmit, className }: InvoiceFormProps) => {
  const [values, setValues] = useState<InvoiceFormValues>({
    reference: invoice?.reference || '',
    projectId: invoice?.projectId || project?.id || 0,
    quoteId: invoice?.quoteId || 0,
    status: invoice?.status || INVOICE_STATUS.DRAFT,
    issueDate: invoice?.issueDate || new Date().toISOString().split('T')[0],
    dueDate: invoice?.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: invoice?.amount || 0,
    totalAmount: invoice?.totalAmount || 0,
  })

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const key = e.target.id
    const value = e.target.value
    setValues((values) => ({
      ...values,
      [key]: value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(values)
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FieldRow label="Référence" name="reference" onChange={onChange}>
          <input
            type="text"
            id="reference"
            value={values.reference}
            onChange={onChange}
            placeholder="Référence automatique"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </FieldRow>

        <FieldRow label="Statut" name="status" onChange={onChange}>
          <Select
            id="status"
            value={values.status}
            onChange={onChange}
            className="w-full"
          >
            <option value={INVOICE_STATUS.DRAFT}>Brouillon</option>
            <option value={INVOICE_STATUS.SENT}>Envoyée</option>
            <option value={INVOICE_STATUS.PAID}>Payée</option>
            <option value={INVOICE_STATUS.OVERDUE}>En retard</option>
            <option value={INVOICE_STATUS.CANCELLED}>Annulée</option>
          </Select>
        </FieldRow>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FieldRow label="Date d'émission" name="issueDate" onChange={onChange}>
            <input
              type="date"
              id="issueDate"
              value={values.issueDate}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FieldRow>

          <FieldRow label="Date d'échéance" name="dueDate" onChange={onChange}>
            <input
              type="date"
              id="dueDate"
              value={values.dueDate}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FieldRow>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FieldRow label="Montant HT" name="amount" onChange={onChange}>
            <input
              type="number"
              id="amount"
              value={values.amount}
              onChange={onChange}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              step="0.01"
            />
          </FieldRow>

          <FieldRow label="Montant TTC" name="totalAmount" onChange={onChange}>
            <input
              type="number"
              id="totalAmount"
              value={values.totalAmount}
              onChange={onChange}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              step="0.01"
            />
          </FieldRow>
        </div>

        {project && (
          <FieldRow label="Projet" name="projectId" onChange={onChange}>
            <Select
              id="projectId"
              value={values.projectId?.toString() || ''}
              onChange={(e) => {
                const projectId = parseInt(e.target.value) || 0
                setValues((values) => ({ ...values, projectId }))
              }}
              className="w-full"
            >
              <option value="">Sélectionner un projet</option>
              <option value={project.id} selected>
                {project.name}
              </option>
            </Select>
          </FieldRow>
        )}

        {quotes && quotes.length > 0 && (
          <FieldRow label="Devis associé" name="quoteId" onChange={onChange}>
            <Select
              id="quoteId"
              value={values.quoteId?.toString() || ''}
              onChange={(e) => {
                const quoteId = parseInt(e.target.value) || 0
                setValues((values) => ({ ...values, quoteId }))
              }}
              className="w-full"
            >
              <option value="">Sélectionner un devis</option>
              {quotes.map((quote) => (
                <option key={quote.id} value={quote.id}>
                  {quote.reference} - {quote.title}
                </option>
              ))}
            </Select>
          </FieldRow>
        )}

        <div className="flex justify-end space-x-4">
          <Link href="/invoices">
            <Button color="light">
              Annuler
            </Button>
          </Link>
          <Button
            type="submit"
            color="blue"
          >
            {invoice ? 'Mettre à jour' : 'Créer'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default InvoiceForm
