import React, { useState } from 'react'
import { FieldRow } from './FieldRow'
import { Link } from '@inertiajs/react'
import { Button, Select } from 'flowbite-react'
import Quote from '#models/quote'

type EditQuoteForm = {
  quote: Quote
  onSubmit: (values: EditQuoteFormValues) => void
}

export type EditQuoteFormValues = {
  title: string
  description: string
  contactId: number
}

const EditQuoteForm: React.FC<EditQuoteForm> = ({ quote, onSubmit }) => {
  const [values, setValues] = useState<EditQuoteFormValues>({
    title: quote?.title,
    description: quote?.description,
    contactId: quote?.contactId,
  })

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const key = e.target.id
    const value = e.target.value
    setValues((values) => ({
      ...values,
      [key]: value,
    }))
  }

  return (
    <div className="p-10">
      <h1 className="mb-10">Modifier le devis</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(values)
        }}
      >
        <div className="space-y-6">
          <FieldRow label="Titre" name="title" values={values} {...{ onChange }} />
          <FieldRow label="Civilité" name="civility" values={values} {...{ onChange }} />
          {clients && (
            <FieldRow label="Client" name="clientId" values={values} {...{ onChange }}>
              <Select id="clientId" onChange={onChange}>
                {clients.map((client) => (
                  <option
                    key={client.id}
                    value={client.id}
                    selected={client.id === contact?.clientId}
                  >
                    {client.name}
                  </option>
                ))}
              </Select>
            </FieldRow>
          )}
        </div>

        <div className="flex gap-4 mt-10">
          <Button type="submit">Valider</Button>
          <Button as={Link} href="/contacts" color="gray">
            Retour à la liste
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditQuoteForm
