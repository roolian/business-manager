import { router } from '@inertiajs/react'
import { CrudList, CrudListQuery } from '../crud/CrudList'
import { ModelObject } from '@adonisjs/lucid/types/model'

interface ContactIndexProps {
  contactsData: {
    meta?: any
    data: ModelObject[]
  }
  queryParams: CrudListQuery
}

const ContactIndex = ({ contactsData, queryParams }: ContactIndexProps) => {
  const onQueryUpdate = (newQuery: CrudListQuery) => {
    router.get('/contacts', { ...newQuery }, { only: ['data'], preserveState: true })
  }

  const columns = [
    {
      name: 'id',
      label: 'ID',
      sortable: true,
    },
    {
      name: 'firstName',
      label: 'Prénom',
      sortable: true,
    },
    {
      name: 'lastName',
      label: 'Nom',
      sortable: true,
    },
    {
      name: 'civility',
      label: 'Civilité',
      sortable: true,
    },
    {
      name: 'client.name',
      label: 'Client',
      sortable: false,
    },
    {
      name: 'createdAt',
      label: 'Date de création',
      sortable: true,
    },
  ]

  return (
    <>
      <div className="p-10">
        <h1 className="text-lg mb-5">Contacts</h1>

        <CrudList
          crudData={contactsData}
          crudListQuery={queryParams}
          onQueryUpdate={onQueryUpdate}
          pathKey="contacts"
          columns={columns}
        />
      </div>
    </>
  )
}

export default ContactIndex
