import { Head, router } from '@inertiajs/react'
import type { InferPageProps } from '@adonisjs/inertia/types'
import InvoicesController from '#controllers/invoices_controller'
import { CrudListQuery } from '~/app/components/crud/CrudList'
import InvoiceIndex from '~/app/components/list/InvoiceIndex'

export default ({ invoicesData, queryParams }: InferPageProps<InvoicesController, 'index'>) => {
  const onQueryUpdate = (newQuery: CrudListQuery) => {
    router.get('/invoices', { ...newQuery }, { only: ['invoicesData'], preserveState: true })
  }

  return (
    <>
      <Head title="Invoices" />
      <div className="page-content">
        <h1 className="text-lg mb-5">Invoices</h1>

        <InvoiceIndex
          invoicesData={invoicesData}
          queryParams={queryParams}
          onQueryUpdate={onQueryUpdate}
        />
      </div>
    </>
  )
}
