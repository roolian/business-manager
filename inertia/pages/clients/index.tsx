import { Head } from '@inertiajs/react'
import type { InferPageProps } from '@adonisjs/inertia/types'
import ClientsController from '#controllers/clients_controller'
import ClientIndex from '~/app/components/list/ClientIndex'

export default ({ clientsData, queryParams }: InferPageProps<ClientsController, 'index'>) => {
  return (
    <>
      <Head title="Homepage" />
      <div className="page-content">
        <h1 className="">Clients</h1>

        <ClientIndex clientsData={clientsData} queryParams={queryParams} />
      </div>
    </>
  )
}
