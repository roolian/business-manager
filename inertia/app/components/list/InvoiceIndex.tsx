import { ColumnInterface, CrudList, CrudListQuery } from '../crud/CrudList'
import { ModelObject } from '@adonisjs/lucid/types/model'

interface InvoiceIndexProps {
  invoicesData: {
    meta?: any
    data: ModelObject[]
  }
  queryParams: any
  onQueryUpdate: (newQuery: CrudListQuery) => void
}

const InvoiceIndex = ({ invoicesData, queryParams, onQueryUpdate }: InvoiceIndexProps) => {
  const columns: ColumnInterface[] = [
    {
      name: 'invoice.reference',
      label: 'Référence',
      sortable: true,
    },
    {
      name: 'project.name',
      label: 'Projet',
      sortable: true,
    },
    {
      name: 'invoice.status',
      label: 'Statut',
      sortable: true,
    },
    {
      name: 'invoice.amount',
      label: 'Montant HT',
      sortable: true,
    },
    {
      name: 'invoice.total_amount',
      label: 'Montant TTC',
      sortable: true,
    },
    {
      name: 'invoice.issue_date',
      label: 'Date émission',
      sortable: true,
    },
  ]

  return (
    <>
      <CrudList
        crudData={invoicesData}
        crudListQuery={queryParams}
        onQueryUpdate={onQueryUpdate}
        pathKey="invoices"
        columns={columns}
      />
    </>
  )
}

export default InvoiceIndex
