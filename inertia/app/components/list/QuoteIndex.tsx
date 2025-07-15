import { ColumnInterface, CrudList, CrudListQuery } from '../crud/CrudList'
import { ModelObject } from '@adonisjs/lucid/types/model'

interface QuoteIndexProps {
  quotesData: {
    meta?: any
    data: ModelObject[]
  }
  queryParams: any
  onQueryUpdate: (newQuery: CrudListQuery) => void
}

const QuoteIndex = ({ quotesData, queryParams, onQueryUpdate }: QuoteIndexProps) => {
  const columns: ColumnInterface[] = [
    {
      name: 'quote.id',
      label: 'ID',
      sortable: true,
    },
    {
      name: 'contact.lastName',
      label: 'Contact Last Name',
      sortable: true,
    },
    {
      name: 'contact.firstName',
      label: 'Contact First Name',
      sortable: true,
    },
    {
      name: 'client.name',
      label: 'Client',
      sortable: true,
    },
    {
      name: 'amount',
      label: 'Amount',
      sortable: true,
    },
    {
      name: 'created_at',
      label: 'Date Created',
      sortable: true,
    },
  ]

  console.log(quotesData)

  return (
    <>
      <CrudList
        crudData={quotesData}
        crudListQuery={queryParams}
        onQueryUpdate={onQueryUpdate}
        pathKey="quotes"
        columns={columns}
      />
    </>
  )
}

export default QuoteIndex
