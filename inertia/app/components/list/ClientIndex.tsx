import { router } from '@inertiajs/react'
import { ColumnInterface, CrudList, CrudListQuery } from '../crud/CrudList'
import { ModelObject } from '@adonisjs/lucid/types/model'

interface ClientIndexProps {
  clientsData: {
    meta?: any
    data: ModelObject[]
  }
  queryParams: any
}

const ClientIndex = ({ clientsData, queryParams }: ClientIndexProps) => {
  const onQueryUpdate = (newQuery: CrudListQuery) => {
    router.get('/clients', { ...newQuery }, { only: ['clientsData'], preserveState: true })
  }

  const columns: ColumnInterface[] = [
    {
      name: 'id',
      label: 'ID',
      sortable: true,
    },
    {
      name: 'name',
      label: 'Nom',
      sortable: true,
    },
    {
      name: 'address',
      label: 'Adresse',
      sortable: true,
    },
    {
      name: 'createdAt',
      label: 'Date de création',
      sortable: true,
    },
  ]

  return (
    <>
      <CrudList
        crudData={clientsData}
        crudListQuery={queryParams}
        onQueryUpdate={onQueryUpdate}
        pathKey="clients"
        columns={columns}
      />
    </>
  )
}

export default ClientIndex
