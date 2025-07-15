import { usePage } from '@inertiajs/react'
import { Label, Textarea, TextInput } from 'flowbite-react'
import { ChangeEventHandler, FC } from 'react'

export interface FieldRowProps {
  name: string
  label: string
  onChange?: ChangeEventHandler
  values?: { [key: string]: string | number }
  type?: 'text' | 'email' | 'number' | 'password' | 'textarea'
  children?: React.ReactNode
}

const FieldRow: FC<FieldRowProps> = ({children, type, name, label, onChange, values }) => {
  const { errors } = usePage().props

  const displayField = (type: string) => {
    switch (type) {
      case 'text':
        return (
          <TextInput
            id={name}
            type="text"
            sizing="sm"
            value={values?.[name]}
            className="w-full"
            onChange={onChange}
            color={errors?.[name] && 'failure'}
          />
        )
      case 'email':
        return (
          <TextInput
            id={name}
            type="email"
            value={values?.[name]}
            onChange={onChange}
            color={errors?.[name] && 'failure'}
          />
        )
      case 'number':
        return (
          <TextInput
            id={name}
            type="number"
            value={values?.[name]}
            onChange={onChange}
            color={errors?.[name] && 'failure'}
          />
        )
      case 'password':
        return (
          <TextInput
            id={name}
            type="password"
            value={values?.[name]}
            onChange={onChange}
            color={errors?.[name] && 'failure'}
          />
        )
      case 'textarea':
        return (
          <Textarea 
            id={name}
            value={values?.[name]}
            onChange={onChange}
            className="w-full h-24 p-2 border rounded"
          />
        )
      default:
        return children
    }
  }

  return (
    <div className="flex gap-8">
      <div className="mb-2 block w-32">
        <Label htmlFor={name} value={label} />
      </div>
      <div className="flex-1 max-w-md">
        {displayField(type)}

        {errors?.[name] && <div className="text-xs mt-1 text-red-600">{errors?.[name]}</div>}
      </div>
    </div>
  )
}

export { FieldRow }
