import { Link } from '@inertiajs/react'
import { Button, Label, Pagination, Table, TextInput } from 'flowbite-react'
import React, { FC, useEffect } from 'react'
import { useState } from 'react'
import _ from 'lodash'
import {
  HiChevronDown,
  HiChevronUp,
  HiDocumentAdd,
  HiPencilAlt,
  HiSearch,
  HiSelector,
  HiTrash,
} from 'react-icons/hi'
import { toast } from 'react-toastify'
import { useEffectAfterMount } from '~/app/hooks/useEffectAfterMount'
import { ModelObject } from '@adonisjs/lucid/types/model'

interface ColumnInterface {
  name: string
  label: string
  sortable?: boolean
}

interface CrudListQuery {
  orderby?: string
  direction?: 'asc' | 'desc'
  page?: number
  s?: string
}

interface CrudListProps {
  crudData: {
    meta?: any
    data: ModelObject[]
  }
  onQueryUpdate: (query: CrudListQuery) => void
  crudListQuery: CrudListQuery
  pathKey: string
  columns: ColumnInterface[]
}

const CrudList: React.FC<CrudListProps> = ({
  crudData,
  crudListQuery,
  onQueryUpdate,
  pathKey,
  columns,
}) => {
  const [queryState, setQueryState] = useState<CrudListQuery>(crudListQuery)

  const updateData = (payload: CrudListQuery) => {
    setQueryState((oldQueryState) => {
      return {
        ...oldQueryState,
        ...{ page: 1 },
        ...payload,
      }
    })
  }

  useEffectAfterMount(() => {
    onQueryUpdate(queryState)
  }, [queryState])

  return (
    <div>
      <div className="mb-3 flex justify-between">
        <div>
          <Link href={`/${pathKey}/create`}>
            <Button>
              Nouveau
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
            {columns.map((column) => (
              <Table.HeadCell key={column.name}>
                <ColumnHead column={column} onUpdate={updateData} query={queryState} />
              </Table.HeadCell>
            ))}
            <Table.HeadCell scope="col" className="px-6 py-3"></Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {crudData.data.map((item: any) => (
              <Table.Row
                key={item.id}
                className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                {columns.map((column) => (
                  <Table.Cell
                    key={column.name}
                    scope="row"
                    className="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {_.get(item, column.name)}
                  </Table.Cell>
                ))}

                <Table.Cell className="px-6 py-4 flex gap-4">
                  <Link href={`/${pathKey}/` + item.id} className="   hover:text-blue-600">
                    <HiPencilAlt size={20} />
                  </Link>
                  <Link
                    method="delete"
                    onSuccess={() => toast.success('Item deleted successfully')}
                    as="button"
                    href={`/${pathKey}/` + item.id}
                    className="   hover:text-red-600"
                  >
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
          currentPage={crudData.meta.currentPage}
          totalPages={crudData.meta.lastPage}
          onPageChange={(page: number) => page && updateData({ page })}
        />
      </div>
    </div>
  )
}

interface ColumnHeadProps {
  column: {
    name: string
    label: string
    sortable?: boolean
  }
  query?: CrudListQuery
  onUpdate?: (payLoad: CrudListQuery) => void
}

const ColumnHead: FC<ColumnHeadProps> = ({ column, query, onUpdate }) => {
  return (
    <div className="py-3 gap-1 flex items-center relative">
      <span>{column.label}</span>
      {column.sortable && (
        <ColumnHeadSortButton columnName={column.name} onUpdate={onUpdate} query={query} />
      )}
    </div>
  )
}

interface ColumnHeadSortButtonProps {
  columnName: string
  query?: CrudListQuery
  onUpdate?: (payLoad: CrudListQuery) => void
}

const ColumnHeadSortButton: FC<ColumnHeadSortButtonProps> = ({
  columnName,
  query = {},
  onUpdate = () => {},
}) => {
  const [sortQuery, setSortQuery] = useState<CrudListQuery>(query)

  useEffect(() => {
    setSortQuery(() => {
      const newSortQuery: CrudListQuery = {
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
    <button type="button" onClick={() => onUpdate(sortQuery)} className="flex items-center">
      <span className="absolute inset-0"></span>
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

export { CrudList, type CrudListQuery, type ColumnInterface }
