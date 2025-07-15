import { Head, router } from '@inertiajs/react'
import { toast } from 'react-toastify'
import ClientForm, { ClientFormValues } from '~/app/components/forms/ClientForm'

export default function ClientCreate() {
  function handleSubmit(values: ClientFormValues) {
    router.post('/clients/create', values, {
      onSuccess: () => toast.success('Client créé avec succès'),
      onError: () => toast.error('Vérifiez les données'),
    })
  }

  return (
    <>
      <Head title="Homepage" />

      <div className="page-content">
        <h1>Créer un nouveau client</h1>
        <ClientForm onSubmit={handleSubmit} />
      </div>
    </>
  )
}
