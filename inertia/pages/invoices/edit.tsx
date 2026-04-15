import Invoice from '#models/invoice'
import Project from '#models/project'
import Quote from '#models/quote'
import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'
import InvoiceForm from '~/app/components/forms/InvoiceForm'

type PageInvoiceEditProps = {
  invoice: Invoice
  project: Project
  quotes: Quote[]
}

export default function Edit({ invoice, project, quotes }: PageInvoiceEditProps) {
  function handleSubmit(values: any) {
    router.put(`/invoices/${invoice.id}`, values, {
      onSuccess: () => toast.success('Facture mise à jour avec succès'),
      onError: () => toast.error('Vérifiez les données'),
    })
  }

  return (
    <div className="page-content">
      <h1 className="text-2xl font-semibold mb-6">Modifier la Facture</h1>
      <p className="text-gray-600 mb-6">Mettre à jour les informations de la facture</p>
      <InvoiceForm invoice={invoice} project={project} quotes={quotes} onSubmit={handleSubmit} />
    </div>
  )
}
