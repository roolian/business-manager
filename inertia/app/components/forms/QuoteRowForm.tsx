import Quote from '#models/quote'
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

interface QuoteRowValues {
  description: string
  amount: number
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
  const [quoteRows, setQuoteRows] = useState<QuoteRowValues[]>(quote.rows || [])

  const rowFields = [
    { id: 'description', label: 'Description' },
    { id: 'amount', label: 'Amount' },
  ]

  return (
    <div className={className}>
      <h2>Quote Rows</h2>
      <Table>
        <TableHead>
          <TableHeadCell>Description</TableHeadCell>
          <TableHeadCell>Amount</TableHeadCell>
          <TableHeadCell></TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {quoteRows.map((row, index) => (
            <TableRow key={index}>
              {rowFields.map((field) => (
                <TableCell key={field.id}>
                  <input
                    type="text"
                    id={`row-${index}-${field.id}`}
                    value={row[field.id as keyof QuoteRowValues]}
                    onChange={(e) => {
                      setQuoteRows((currentRows) => {
                        const newRows = [...currentRows]
                        const newRow: QuoteRowValues = newRows[index] ?? {
                          description: '',
                          amount: 0,
                        }
                        if (Object.keys(newRow).includes(field.id)) {
                          newRow[field.id as keyof QuoteRowValues] = e.target.value
                        }
                        return newRows
                      })
                    }}
                    placeholder={field.label}
                  />
                </TableCell>
              ))}
              <TableCell>
                <a
                  className="cursor-pointer hover:text-red-600"
                  onClick={() => {
                    const newRows = [...quoteRows]
                    newRows.splice(index, 1)
                    setQuoteRows(newRows)
                    row.id &&onDelete && onDelete(row.id)
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
            setQuoteRows([...quoteRows, { description: '', amount: 0 }])
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
