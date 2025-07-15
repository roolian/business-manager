import { Head } from '@inertiajs/react'
import type { InferPageProps } from '@adonisjs/inertia/types'
import ContactsController from '#controllers/contacts_controller'
import ContactIndex from '~/app/components/list/ContactIndex'

export default ({ data, queryParams }: InferPageProps<ContactsController, 'index'>) => {
  return (
    <>
      <Head title="Homepage" />
      <ContactIndex contactsData={data} queryParams={queryParams} />
    </>
  )
}
