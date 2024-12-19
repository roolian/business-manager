import { Head, Link, router } from '@inertiajs/react'
import {
  HiChevronDown,
  HiChevronUp,
  HiDocumentAdd,
  HiPencilAlt,
  HiSearch,
  HiSelector,
  HiTrash,
} from 'react-icons/hi'
import type { InferPageProps } from '@adonisjs/inertia/types'
import ClientsController from '#controllers/clients_controller'
import { FC, useEffect, useState } from 'react'
import { Button, Label, Pagination, Table, TextInput } from 'flowbite-react'
import { useEffectAfterMount } from '~/app/hooks/useEffectAfterMount'
import { toast } from "react-toastify"

interface CrudQuery {
  orderby?: string
  direction?: 'asc' | 'desc'
  page?: number
  s?: string
}

export default ({ clientsData, queryParams }: InferPageProps<ClientsController, 'index'>) => {
  const [queryState, setQueryState] = useState<CrudQuery>(queryParams)

  const updateData = (payload: CrudQuery) => {
    console.log(payload)
    setQueryState((oldQueryState) => {
      return {
        ...oldQueryState,
        ...{ page: 1 },
        ...payload,
      }
    })
  }

  useEffectAfterMount(() => {
    router.get('/clients', { ...queryState }, { only: ['clientsData'], preserveState: true })
  }, [queryState])

  return (
    <>
      <Head title="Homepage" />
      <div className="p-10">
        <h1 className="text-lg mb-5">Clients</h1>

        <div className="mb-3 flex justify-between">
          <div>
            <Link href="/clients/create">
              <Button>
                Nouveau client
                <HiDocumentAdd className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div>
            <div className="max-w-md">
              <Label htmlFor="search" value="Search" className="sr-only" />

              <TextInput
                id="search"
                icon={HiSearch}
                placeholder="Search"
                value={queryState.s}
                onChange={(e) => updateData({ s: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto border border-gray-200  sm:rounded-md">
          <Table hoverable striped draggable>
            <Table.Head>
              <Table.HeadCell>
                <ColumnHead
                  column={{
                    name: 'id',
                    label: 'ID',
                    sortable: true,
                  }}
                  onUpdate={updateData}
                  query={queryState}
                />
              </Table.HeadCell>

              <Table.HeadCell>
                <ColumnHead
                  column={{
                    name: 'name',
                    label: 'Nom',
                    sortable: true,
                  }}
                  onUpdate={updateData}
                  query={queryState}
                />
              </Table.HeadCell>
              <Table.HeadCell>
                <ColumnHead
                  column={{
                    name: 'address',
                    label: 'Adresse',
                    sortable: true,
                  }}
                  onUpdate={updateData}
                  query={queryState}
                />
              </Table.HeadCell>

              <Table.HeadCell>
                <ColumnHead
                  column={{
                    name: 'createdAt',
                    label: 'Date de création',
                    sortable: true,
                  }}
                  onUpdate={updateData}
                  query={queryState}
                />
              </Table.HeadCell>

              <Table.HeadCell scope="col" className="px-6 py-3"></Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {clientsData.data.map((c) => (
                <Table.Row
                  key={c.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <Table.Cell
                    scope="row"
                    className="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {c.id}
                  </Table.Cell>
                  <Table.Cell
                    scope="row"
                    className="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {c.name}
                  </Table.Cell>
                  <Table.Cell
                    scope="row"
                    className="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {c.address} <br /> {c.postalCode} {c.city}
                  </Table.Cell>
                  <Table.Cell
                    scope="row"
                    className="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {new Date(c.createdAt).toLocaleDateString('fr-fr')}
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4 flex gap-4">
                    <Link  href={'/clients/' + c.id} className="   hover:text-blue-600">
                      <HiPencilAlt size={20} />
                    </Link>
                    <Link method="delete" onSuccess={() => toast.success('')} as="button" href={'/clients/' + c.id} className="   hover:text-red-600">
                      <HiTrash size={20} />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <div className="flex overflow-x-auto sm:justify-center mt-5">
          <Pagination
            currentPage={clientsData.meta.currentPage}
            totalPages={clientsData.meta.lastPage}
            onPageChange={(page: number) => page && updateData({ page })}
          />
        </div>
      </div>
    </>
  )
}

interface ColumnHeadProps {
  column: {
    name: string
    label: string
    sortable?: boolean
  }
  query?: CrudQuery
  onUpdate?: (payLoad: CrudQuery) => void
}

const ColumnHead: FC<ColumnHeadProps> = ({ column, query, onUpdate }) => {
  return (
    <div className="py-3">
      {column.label}
      {column.sortable && (
        <ColumnHeadSortButton columnName={column.name} onUpdate={onUpdate} query={query} />
      )}
    </div>
  )
}

interface ColumnHeadSortButtonProps {
  columnName: string
  query?: CrudQuery
  onUpdate?: (payLoad: CrudQuery) => void
}

const ColumnHeadSortButton: FC<ColumnHeadSortButtonProps> = ({
  columnName,
  query = {},
  onUpdate = () => {},
}) => {
  const [sortQuery, setSortQuery] = useState<CrudQuery>(query)

  useEffect(() => {
    setSortQuery(() => {
      const newSortQuery: CrudQuery = {
        orderby: columnName,
        direction: 'asc',
      }
      if (query.orderby === columnName) {
        newSortQuery.direction = query.direction === 'asc' ? 'desc' : 'asc'
      }
      return newSortQuery
    })
  }, [query])

  return (
    <button type="button" onClick={() => onUpdate(sortQuery)}>
      {query.orderby !== columnName ? (
        <HiSelector className="inline-block" />
      ) : query.direction === 'desc' ? (
        <HiChevronUp className="inline-block" />
      ) : (
        <HiChevronDown className="inline-block" />
      )}
    </button>
  )
}
