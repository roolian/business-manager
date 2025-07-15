import Quote from '#models/quote'
import { useState } from 'react'
import { FieldRow } from './FieldRow'
import { Button, Select, Table, TableRow } from 'flowbite-react'
import Contact from '#models/contact'
import { Link } from '@inertiajs/react'
import QuoteRow from '#models/quote_row'

export type QuoteFormValues = {
  contactId?: number
  description?: string
  title?: string
}

interface QuoteFormProps {
  quote?: Quote
  contacts?: Contact[]
  onSubmit: (values: QuoteFormValues) => void
  className?: string
}

const QuoteForm = ({ quote, contacts, onSubmit, className }: QuoteFormProps) => {
  const [values, setValues] = useState<QuoteFormValues>({
    contactId: quote?.contactId,
    description: quote?.description,
    title: quote?.title,
  })


  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const key = e.target.id
    const value = e.target.value
    setValues((values) => ({
      ...values,
      [key]: value,
    }))
  }

  return (
    <div className={className}>
      <h1>Quote Form</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(values)
        }}
      >
        <div className="flex flex-col gap-6">
          {contacts && (
            <FieldRow label="Contact" name="contactId" values={values} {...{ onChange }}>
              <Select id="contactId" onChange={onChange} value={values.contactId}>
                {contacts.map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.client?.name} - {contact.lastName} {contact.firstName}
                  </option>
                ))}
              </Select>
            </FieldRow>
          )}

          <FieldRow type="text" label="Titre" name="title" values={values} {...{ onChange }} />

          <FieldRow
            label="Description"
            name="description"
            type="textarea"
            values={values}
            {...{ onChange }}
          />
        </div>

        <div className="flex gap-4 mt-10">
          <Button type="submit">Valider</Button>
          <Button as={Link} href="/quotes" color="gray">
            Retour à la liste
          </Button>
        </div>
      </form>
    </div>
  )
}

export default QuoteForm
