import { Head, router } from '@inertiajs/react'
import { toast } from 'react-toastify'

import ContactForm, { ContactFormValues } from '~/app/components/forms/ContactForm'
import Client from '#models/client'

type PageContactCreateProps = {
  clients: Client[]
}

export default function ClientCreate({ clients }: PageContactCreateProps) {
  function handleSubmit(values: ContactFormValues) {
    router.post('/contacts/create', values, {
      onSuccess: () => toast.success('Client créé avec succès'),
      onError: () => toast.error('Vérifiez les données'),
    })
  }

  return (
    <>
      <Head title="Homepage" />

      <div className="page-content">
        <h1>Créer un nouveau contact</h1>
        <ContactForm onSubmit={handleSubmit} clients={clients} />
      </div>
    </>
  )
}
