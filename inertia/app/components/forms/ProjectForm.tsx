import { useState } from 'react'
import { FieldRow } from './FieldRow'
import { Button, Select } from 'flowbite-react'
import Client from '#models/client'
import { Link } from '@inertiajs/react'
import { PROJECT_TYPE, PROJECT_STATUS } from "#types/project_type"

export type ProjectFormValues = {
  name?: string
  description?: string
  type?: string
  status?: string
  clientId?: number
  startDate?: string
  endDate?: string
}

interface ProjectFormProps {
  project?: any
  clients?: Client[]
  onSubmit?: (values: ProjectFormValues) => void
  className?: string
}

const ProjectForm = ({ project, clients, onSubmit, className }: ProjectFormProps) => {
  const [values, setValues] = useState<ProjectFormValues>({
    name: project?.name || '',
    description: project?.description || '',
    type: project?.type || PROJECT_TYPE.PACKAGE,
    status: project?.status || PROJECT_STATUS.ACTIVE,
    clientId: project?.clientId || 0,
    startDate: project?.startDate || '',
    endDate: project?.endDate || '',
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(values)
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FieldRow label="Project Name *" name="name" onChange={onChange}>
          <input
            type="text"
            id="name"
            value={values.name}
            onChange={onChange}
            placeholder="Enter project name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </FieldRow>

        <FieldRow label="Description *" name="description" onChange={onChange}>
          <textarea
            id="description"
            value={values.description}
            onChange={onChange}
            placeholder="Enter project description"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </FieldRow>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FieldRow label="Project Type *" name="type" onChange={onChange}>
            <Select
              id="type"
              value={values.type}
              onChange={onChange}
              className="w-full"
              required
            >
              <option value={PROJECT_TYPE.PACKAGE}>Package (Forfait)</option>
              <option value={PROJECT_TYPE.TIME_TRACKING}>Time Tracking (Temps réel)</option>
              <option value={PROJECT_TYPE.MAINTENANCE}>Maintenance</option>
            </Select>
          </FieldRow>

          <FieldRow label="Status *" name="status" onChange={onChange}>
            <Select
              id="status"
              value={values.status}
              onChange={onChange}
              className="w-full"
              required
            >
              <option value={PROJECT_STATUS.ACTIVE}>Active</option>
              <option value={PROJECT_STATUS.COMPLETED}>Completed</option>
              <option value={PROJECT_STATUS.PAUSED}>Paused</option>
              <option value={PROJECT_STATUS.CANCELLED}>Cancelled</option>
            </Select>
          </FieldRow>
        </div>

        <FieldRow label="Client *" name="clientId" onChange={onChange}>
          <Select
            id="clientId"
            value={values.clientId?.toString() || ''}
            onChange={(e) => {
              const clientId = parseInt(e.target.value) || 0
              setValues((values) => ({ ...values, clientId }))
            }}
            className="w-full"
            required
          >
            <option value="">Select a client</option>
            {clients?.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </Select>
        </FieldRow>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FieldRow label="Start Date">
            <input
              type="date"
              id="startDate"
              value={values.startDate}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FieldRow>

          <FieldRow label="End Date">
            <input
              type="date"
              id="endDate"
              value={values.endDate}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FieldRow>
        </div>

        <div className="flex justify-end space-x-4">
          <Link href="/projects">
            <Button color="light">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            color="blue"
          >
            {project ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
