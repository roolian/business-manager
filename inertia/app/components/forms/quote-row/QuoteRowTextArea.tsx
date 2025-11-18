import { cn } from "~/app/libs/utils/cn"
import { QuoteRowValues } from "./QuoteRowForm"
import { useEffect, useRef } from "react"
import { Field } from "./QuoteRowDynamicTableRow"


const TextArea = ({
  index,
  errors,
  field,
  row,
  onChange,
}: {
  index: number
  errors: any
  field: Field
  row: QuoteRowValues
  onChange: (e: React.ChangeEvent<HTMLElement>, field: Field) => void
}) => {

  const parentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.dataset.clonedVal = row[field.id as keyof QuoteRowValues] as string | ''
    }
  }, [row, field.id])

  return (
    <div
    ref={parentRef}
    className="grid
      text-base
      after:px-3.5
      after:py-2.5
      [&>textarea]:text-inherit
      after:text-inherit
      [&>textarea]:resize-none
      [&>textarea]:overflow-hidden
      [&>textarea]:[grid-area:1/1/2/2]
      after:[grid-area:1/1/2/2]
      after:whitespace-pre-wrap
      after:invisible
      after:content-[attr(data-cloned-val)_'_']
      after:border"
    >
      <textarea
        className={cn(
          'w-full border-0 focus:ring-0  focus:outline-offset-2 focus:outline-blue-200 placeholder:text-gray-300 ',
          {
            'ring-red-200 ring-2 ': errors?.[`rows.${index}.${field.id as any}`],
          }
        )}
        id={`row-${index}-${field.id}`}
        value={row[field.id as keyof QuoteRowValues] as string | number || ''}
        onChange={(e) => {
          onChange(e, field)
        }}
        onInput={ (e) => { parentRef.current!.dataset.clonedVal = e.currentTarget.value }}
        placeholder={field.label}
        rows={1}
      />
    </div>
  )
}

export { TextArea }