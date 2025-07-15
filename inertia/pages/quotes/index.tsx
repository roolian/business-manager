import { Head, router } from '@inertiajs/react'
import type { InferPageProps } from '@adonisjs/inertia/types'
import QuotesController from '#controllers/quotes_controller'
import QuoteIndex from '~/app/components/list/QuoteIndex'
import { CrudListQuery } from "~/app/components/crud/CrudList"

export default ({ quotesData, queryParams }: InferPageProps<QuotesController, 'index'>) => {

  const onQueryUpdate = (newQuery: CrudListQuery) => {
    router.get('/quotes', { ...newQuery }, { only: ['quotesData'], preserveState: true })
  }

  return (
    <>
      <Head title="Quotes" />
      <div className="page-content">
        <h1 className="text-lg mb-5">Quotes</h1>

        <QuoteIndex quotesData={quotesData} queryParams={queryParams} onQueryUpdate={onQueryUpdate} />
      </div>
    </>
  )
}
