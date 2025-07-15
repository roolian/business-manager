import Contact from '#models/contact'
import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'
import QuoteForm from '~/app/components/forms/QuoteForm'

type PageContactQuoteProps = {
  contacts: Contact[]
}

export default function Create({ contacts }: PageContactQuoteProps) {
  function handleSubmit(values: any) {
    router.post('/quotes/create', values, {
      onSuccess: () => toast.success('Client créé avec succès'),
      onError: () => toast.error('Vérifiez les données'),
    })
  }

  return (
    <div className="page-content">
      <h1 className="text-2xl font-semibold mb-6">Nouvelle Citation</h1>
      <QuoteForm onSubmit={handleSubmit} contacts={contacts} />
    </div>
  )
}
