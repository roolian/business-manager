import { Head, Link, router, usePage } from '@inertiajs/react'
import { Button, Label, TextInput } from 'flowbite-react'
import { ChangeEventHandler, FC, useState } from 'react'
import { toast } from 'react-toastify'

import type { Errors } from '@inertiajs/core'

export default function ClientIndex({ client }) {
  const { errors } = usePage().props

  const [values, setValues] = useState({
    name: client.name,
    address: client.address,
    postalCode: client.postalCode,
    city: client.city,
  })

  function onChange(e) {
    const key = e.target.id
    const value = e.target.value
    setValues((values) => ({
      ...values,
      [key]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    router.post('/clients/' + client.id, values, {
      onSuccess: () => toast.success('Client mis à jour avec succès'),
      onError: () => toast.error('Vérifiez les données'),
    })
  }

  return (
    <>
      <Head title="Homepage" />

      <div className="p-10">
        <h1 className="mb-10">Modifier le client</h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <FieldRow label="Nom" name="name" {...{ onChange, errors, values }} />
            <FieldRow label="Adresse" name="address" {...{ onChange, errors, values }} />
            <FieldRow label="Code postal" name="postalCode" {...{ onChange, errors, values }} />
            <FieldRow label="Ville" name="city" {...{ onChange, errors, values }} />
          </div>

          <div className="flex gap-4 mt-10">
            <Button type="submit">Valider</Button>
            <Button as={Link} href="/clients" color="gray">
              Retour à la liste
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

interface FieldRowProps {
  name: string
  label: string
  onChange: ChangeEventHandler
  values: { [key: string]: string }
  errors?: Errors
}

const FieldRow: FC<FieldRowProps> = ({ name, label, onChange, values, errors }) => {
  return (
    <div className="flex gap-8">
      <div className="mb-2 block w-32">
        <Label htmlFor={name} value={label} />
      </div>
      <div className="flex-1 max-w-md">
        <TextInput
          id={name}
          type="text"
          sizing="sm"
          value={values[name]}
          className="w-full"
          onChange={onChange}
          color={errors?.[name] && 'failure'}
        />
        {errors?.[name] && <div className="text-xs mt-1 text-red-600">{errors?.[name]}</div>}
      </div>
    </div>
  )
}
