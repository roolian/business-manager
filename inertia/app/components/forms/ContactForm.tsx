import Client from '#models/client'
import Contact from '#models/contact'
import React, { useState } from 'react'
import { FieldRow } from './FieldRow'
import { Link } from '@inertiajs/react'
import { Button, Select } from 'flowbite-react'

type ContactForm = {
  contact?: Contact
  clients?: Client[]
  clientId?: number
  onSubmit: (values: ContactFormValues) => void
  isModal?: boolean
}

export type ContactFormValues = {
  firstName?: string
  lastName?: string
  civility?: string
  clientId?: number
}

const ContactForm: React.FC<ContactForm> = ({
  contact,
  clients,
  clientId,
  onSubmit,
  isModal = false,
}) => {
  const [values, setValues] = useState<ContactFormValues>({
    firstName: contact?.firstName,
    lastName: contact?.lastName,
    civility: contact?.civility,
    clientId:
      contact?.clientId || clientId || (clients && clients?.length > 0 ? clients[0].id : undefined),
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
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(values)
        }}
      >
        <div className="space-y-6">
          <FieldRow type="text" label="Prénom" name="firstName" values={values} {...{ onChange }} />
          <FieldRow type="text" label="Nom" name="lastName" values={values} {...{ onChange }} />
          <FieldRow type="text" label="Civilité" name="civility" values={values} {...{ onChange }} />
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
          {!isModal && (
            <Button as={Link} href="/contacts" color="gray">
              Retour à la liste
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ContactForm
