import React, { useState } from 'react'
import { FieldRow } from './FieldRow'
import { Link } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import Client from '#models/client'

type ClientForm = {
  client?: Client
  onSubmit: (values: ClientFormValues) => void
}

export type ClientFormValues = {
  name?: string
  address?: string
  postalCode?: string
  city?: string
}

const ClientForm: React.FC<ClientForm> = ({ client, onSubmit }) => {
  const [values, setValues] = useState<ClientFormValues>({
    name: client?.name,
    address: client?.address,
    postalCode: client?.postalCode,
    city: client?.city,
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
          <FieldRow type="text" label="Nom" name="name" {...{ onChange, values }} />
          <FieldRow type="text" label="Adresse" name="address" {...{ onChange, values }} />
          <FieldRow type="text" label="Code postal" name="postalCode" {...{ onChange, values }} />
          <FieldRow type="text" label="Ville" name="city" {...{ onChange, values }} />
        </div>

        <div className="flex gap-4 mt-10">
          <Button type="submit">Valider</Button>
          <Button as={Link} href="/clients" color="gray">
            Retour à la liste
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ClientForm
