import { HiTrash, HiViewGrid } from 'react-icons/hi'
import { QuoteRowValues } from './QuoteRowForm'
import { Draggable } from '@hello-pangea/dnd'
import { TableCell, TableRow } from 'flowbite-react'
import { cn } from '~/app/libs/utils/cn'
import { TextArea } from './QuoteRowTextArea'

const inputClass =
  'w-full border-0 focus:ring-0  focus:outline-offset-2 focus:outline-blue-200 placeholder:text-gray-300 '

interface Field {
  id: string
  label: string
  type: 'text' | 'number' | 'textarea'
}

const rowFieldsDefault: Field[] = [
  { id: 'description', label: 'Description', type: 'textarea' },
  { id: 'amount', label: 'Amount', type: 'number' },
  { id: 'unit', label: 'Unit', type: 'text' },
  { id: 'quantity', label: 'Quantity', type: 'number' },
]

const rowFieldsHeading: Field[] = [{ id: 'description', label: 'Description', type: 'text' }]

interface QuoteRowDynamicTableRowProps {
  row: QuoteRowValues
  errors: any
  index: number
  onChange: (e: React.ChangeEvent<HTMLElement>, field: Field) => void
  onDelete: () => void
}

const QuoteRowDynamicTableRow = ({
  row,
  errors,
  index,
  onChange,
  onDelete,
}: QuoteRowDynamicTableRowProps) => {
  return (
    <Draggable draggableId={`quoteRow-${row.id ?? row.tempId}`} index={index}>
      {(provided) => (
        <TableRow
          className="divide-x bg-white border w-full"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <TableCell className="text-center p-3 w-8">
            <HiViewGrid size={16} className="text-gray-200" />
          </TableCell>
          {(row.type === 'default' ? rowFieldsDefault : rowFieldsHeading).map((field) => (
            <TableCell
              key={field.id}
              className={cn("py-0 px-1", {
                ' font-bold': row.type === 'heading' && field.id === 'description',
                '': row.type === 'default' && field.id === 'description',
                'w-16': field.id !== 'description',
              })}
              
              colSpan={row.type === 'default' ? 1 : 4}
            >
              {field.type === 'textarea' ? (
                <TextArea
                  index={index}
                  errors={errors}
                  field={field}
                  row={row}
                  onChange={onChange}
                />
              ) : (
                <input
                  className={cn(inputClass, {
                    'ring-red-200 ring-2 ': errors?.[`rows.${index}.${field.id as any}`],
                  })}
                  type={field.type}
                  id={`row-${index}-${field.id}`}
                  value={row[field.id as keyof QuoteRowValues] as string | number}
                  onChange={(e) => {
                    onChange(e, field)
                  }}
                  placeholder={field.label}
                />
              )}

              {errors?.[`rows.${index}.${field.id as any}`] && (
                <span className="text-red-500 text-xs">
                  {errors[`rows.${index}.${field.id as any}`] as string}
                </span>
              )}
            </TableCell>
          ))}
          <TableCell className="text-center w-16!">
            <a className="cursor-pointer hover:text-red-600" onClick={onDelete}>
              <HiTrash size={20} />
            </a>
          </TableCell>
        </TableRow>
      )}
    </Draggable>
  )
}

export { QuoteRowDynamicTableRow, type Field }
