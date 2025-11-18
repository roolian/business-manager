import Contact from '#models/contact'
import Quote from '#models/quote'
import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'
import QuoteForm, { QuoteFormValues } from '~/app/components/forms/QuoteForm'
import { QuoteRowForm, QuoteRowFormValues } from '~/app/components/forms/quote-row/QuoteRowForm'

type PageQuoteEditProps = {
  quote: Quote
  contacts: Contact[]
}

export default function Edit({ quote, contacts }: PageQuoteEditProps) {
  function handleSubmit(values: QuoteFormValues) {
    router.post('/quotes/' + quote.id, values, {
      onSuccess: () => toast.success('Devis mis à jour avec succès'),
      onError: () => toast.error('Vérifiez les données'),
    })
  }
  function handleSubmitRows(values: QuoteRowFormValues) {
    router.post('/quotes/' + quote.id + '/rows', values, {
      onSuccess: () => toast.success('Devis mis à jour avec succès'),
      onError: () => toast.error('Vérifiez les données'),
      preserveScroll: true,

    })
  }
  function handleDeleteRow(id: number) {
    router.delete('/quotes/' + quote.id + '/rows/' + id, {
      onSuccess: () => toast.success('Ligne de devis supprimée avec succès'),
      onError: () => toast.error('Vérifiez les données'),
      preserveScroll: true,
    })
  }

  return (
    <div className="page-content">
      <QuoteForm className="mb-8" onSubmit={handleSubmit} quote={quote} contacts={contacts} />

      <QuoteRowForm onSubmit={handleSubmitRows} onDelete={handleDeleteRow} quote={quote} />
    </div>
  )
}
