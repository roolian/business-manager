import { Head, router } from '@inertiajs/react'
import { toast } from 'react-toastify'

import EditContactForm, { ContactFormValues } from '~/app/components/forms/ContactForm'
import Contact from '#models/contact'
import Client from '#models/client'

type PageContactEditProps = {
  contact: Contact
  clients: Client[]
}

export default ({ contact, clients }: PageContactEditProps) => {
  function handleSubmit(values: ContactFormValues) {
    router.post('/contacts/' + contact.id, values, {
      onSuccess: () => toast.success('Client mis à jour avec succès'),
      onError: () => toast.error('Vérifiez les données'),
    })
  }

  return (
    <>
      <Head title="Homepage" />

      <div className="page-content">
        <h1>Mise à jour du contact</h1>
        <EditContactForm onSubmit={handleSubmit} contact={contact} clients={clients} />
      </div>
    </>
  )
}
