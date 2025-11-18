import Quote from '#models/quote'
import QuoteRow from '#models/quote_row'
import { QuoteRowType } from '#types/quote_type'
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
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { Field, QuoteRowDynamicTableRow } from './QuoteRowDynamicTableRow'

interface QuoteRowValues extends Partial<QuoteRow> {
  tempId?: number
}

type QuoteRowFormValues = { rows: QuoteRowValues[] }

interface QuoteRowFormProps {
  quote: Quote
  onSubmit?: (values: QuoteRowFormValues) => void
  onDelete?: (id: number) => void
  className?: string
}

const QuoteRowForm = ({ quote, onSubmit, onDelete, className }: QuoteRowFormProps) => {
  const orderRows = (rows: QuoteRowValues[]) => {
    return rows.sort((a, b) => (a.order || 0) - (b.order || 0))
  }

  const { errors } = usePage().props

  const [quoteRows, setQuoteRows] = useState<QuoteRowValues[]>(orderRows(quote.rows || []))

  const defaultRow: QuoteRowValues = {
    type: QuoteRowType.DEFAULT,
    description: '',
    amount: quote?.contact?.client?.dailyRate || 0,
    unit: 'j/h',
    quantity: 0,
  }

  const headingRow: QuoteRowValues = {
    type: QuoteRowType.HEADING,
    description: 'Heading',
    quantity: 0,
    amount: 0,
    unit: '',
  }

  const onDragEnd = (result: any) => {
    console.log(result)
    const { source, destination } = result
    if (!destination) return

    if (destination.index === source.index && destination.droppableId === source.droppableId) return

    setQuoteRows((currentRows) => {
      const newRows = [...orderRows(currentRows)]
      const [movedRow] = newRows.splice(source.index, 1)
      newRows.splice(destination.index, 0, movedRow)

      // Update order based on new index
      return newRows.map((row, index) => ({
        ...row,
        order: index + 1,
      }))
    })
  }

  useEffect(() => {
    console.log(quoteRows)
  }, [quoteRows])

  const getNextOrder = () => {
    if (quoteRows.length === 0) return 0
    return Math.max(...quoteRows.map((row) => row.order || 0)) + 1
  }
  const getNextId = () => {
    if (quoteRows.length === 0) return 0
    const maxId = Math.max(
      ...quoteRows.map((row) => (row.id !== undefined ? row.id : row.tempId || 0))
    )
    return maxId + 1
  }

  const getTotal = () => {
    return quoteRows.reduce((total, row) => total + (row.amount || 0) * (row.quantity || 0), 0)
  }

  return (
    <div className={className}>
      <h2>Quote Rows</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Table>
          <TableHead>
            <TableHeadCell className="p-2 w-8"></TableHeadCell>
            <TableHeadCell className="p-2">Description</TableHeadCell>
            <TableHeadCell className="p-2 w-16">Amount</TableHeadCell>
            <TableHeadCell className="p-2 w-16">Unit</TableHeadCell>
            <TableHeadCell className="p-2 w-16">Quantity</TableHeadCell>
            <TableHeadCell className="p-2 w-16"></TableHeadCell>
          </TableHead>
          <Droppable droppableId={`quoteRow`} >
            {(provided) => (
              <TableBody className="" ref={provided.innerRef} {...provided.droppableProps}>
                {quoteRows.map((row, index) => (
                  <QuoteRowDynamicTableRow
                    key={row.id ?? row.tempId}
                    row={row}
                    index={index}
                    errors={errors}
                    onChange={(e, field: Field) => {
                      setQuoteRows((currentRows) => {
                        console.log(currentRows)
                        const newRows = [...currentRows]
                        const newRow: QuoteRowValues = newRows[index] ?? {
                          order: index + 1,
                          ...defaultRow,
                        }
                        if (Object.keys(newRow).includes(field.id)) {
                          const target = e.target as HTMLInputElement
                          const value =
                            field.type === 'number' ? parseFloat(target.value) || 0 : target.value
                          ;(newRow[field.id as keyof QuoteRowValues] as any) = value
                        }
                        return newRows
                      })
                    }}
                    onDelete={() => {
                      const newRows = [...quoteRows]
                      newRows.splice(index, 1)
                      setQuoteRows(newRows)
                      row.id && onDelete && onDelete(row.id)
                    }}
                  />
                ))}

                {provided.placeholder}
                <TableRow className="">
                  <TableCell></TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right font-bold">{getTotal()} €</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
      <div className="flex gap-4 mt-6">
        <Button
          onClick={() => {
            setQuoteRows([...quoteRows, { tempId: getNextId(), order: getNextOrder(), ...defaultRow }])
          }}
        >
          Add Row
        </Button>
        <Button
          onClick={() => {
            setQuoteRows([...quoteRows, { tempId: getNextId(), order: getNextOrder(), ...headingRow }])
          }}
        >
          Add Heading row
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
