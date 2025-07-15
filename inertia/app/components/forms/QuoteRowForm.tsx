import Quote from '#models/quote'
import { usePage } from '@inertiajs/react'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react'
import { useState } from 'react'
import { HiTrash } from 'react-icons/hi'
import { cn } from '~/app/libs/utils/cn'

interface QuoteRowValues {
  description: string
  amount: number
  quantity: number
  [key: string]: any // Allow additional properties
}

type QuoteRowFormValues = { rows: QuoteRowValues[] }

interface QuoteRowFormProps {
  quote: Quote
  onSubmit?: (values: QuoteRowFormValues) => void
  onDelete?: (id: number) => void
  className?: string
}

const QuoteRowForm = ({ quote, onSubmit, onDelete, className }: QuoteRowFormProps) => {
  const { errors } = usePage().props

  const [quoteRows, setQuoteRows] = useState<QuoteRowValues[]>(quote.rows || [])

  const defaultRow: QuoteRowValues = {
    description: '',
    amount: 0,
    quantity: 0,
  }

  const rowFields = [
    { id: 'description', label: 'Description', type: 'text' },
    { id: 'amount', label: 'Amount', type: 'number' },
    { id: 'quantity', label: 'Quantity', type: 'number' },
  ]
  const inputClass = 'w-full !border-0 !ring-0 outline-hidden focus:outline-offset-2 focus:outline-blue-200 '

  console.log(errors)

  return (
    <div className={className}>
      <h2>Quote Rows</h2>
      <Table>
        <TableHead>
          <TableHeadCell>Description</TableHeadCell>
          <TableHeadCell>Amount</TableHeadCell>
          <TableHeadCell>Quantity</TableHeadCell>
          <TableHeadCell></TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {quoteRows.map((row, index) => (
            <TableRow key={index} className=" divide-x">
              {rowFields.map((field) => (
                <TableCell key={field.id} className="py-0 px-1">
                  <input
                    className={cn(inputClass, {
                      'outline-red-200  outline-hidden': errors?.[`rows.${index}.${field.id as any}`],
                    })}
                    type={field.type}
                    id={`row-${index}-${field.id}`}
                    value={row[field.id as keyof QuoteRowValues]}
                    onChange={(e) => {
                      setQuoteRows((currentRows) => {
                        const newRows = [...currentRows]
                        const newRow: QuoteRowValues = newRows[index] ?? { ...defaultRow }
                        if (Object.keys(newRow).includes(field.id)) {
                          newRow[field.id as keyof QuoteRowValues] = e.target.value
                        }
                        return newRows
                      })
                    }}
                    placeholder={field.label}
                  />

                  {errors?.[`rows.${index}.${field.id as any}`] && (
                    <span className="text-red-500 text-xs">
                      {errors[`rows.${index}.${field.id as any}`] as string}
                    </span>
                  )}
                </TableCell>
              ))}
              <TableCell>
                <a
                  className="cursor-pointer hover:text-red-600"
                  onClick={() => {
                    const newRows = [...quoteRows]
                    newRows.splice(index, 1)
                    setQuoteRows(newRows)
                    row.id && onDelete && onDelete(row.id)
                  }}
                >
                  <HiTrash size={20} />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex gap-4 mt-6">
        <Button
          onClick={() => {
            setQuoteRows([...quoteRows, { ...defaultRow }])
          }}
        >
          Add Row
        </Button>
        <Button
          onClick={() => {
            onSubmit && onSubmit({ rows: quoteRows } as QuoteRowFormValues)
          }}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export { QuoteRowForm, type QuoteRowValues, type QuoteRowFormValues }
