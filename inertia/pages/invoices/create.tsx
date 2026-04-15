import Project from '#models/project'
import Quote from '#models/quote'
import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'
import InvoiceForm from '~/app/components/forms/InvoiceForm'

type PageInvoiceCreateProps = {
  project?: Project
  quotes?: Quote[]
}

export default function Create({ project, quotes }: PageInvoiceCreateProps) {
  function handleSubmit(values: any) {
    if (project) {
      router.post(`/projects/${project.id}/invoices/create`, values, {
        onSuccess: () => toast.success('Facture créée avec succès'),
        onError: () => toast.error('Vérifiez les données'),
      })
    }
    else {
      router.post(`/invoices/create`, values, {
        onSuccess: () => toast.success('Facture créée avec succès'),
        onError: () => toast.error('Vérifiez les données'),
      })
    }
    
  }

  return (
    <div className="page-content">
      <h1 className="text-2xl font-semibold mb-6">Nouvelle Facture</h1>
      <InvoiceForm project={project} quotes={quotes} onSubmit={handleSubmit} />
    </div>
  )
}
